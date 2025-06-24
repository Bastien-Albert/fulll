import React, {useState, useEffect, useRef} from "react";
import type {User as UserGithub} from "../../types/github.ts";
import styles from "./UserControl.module.css";
import Checkbox from "../Checkbox/Checkbox.tsx";
import DeleteIcon from "../Icon/DeleteIcon.tsx";
import CopyIcon from "../Icon/CopyIcon.tsx";

interface UserControlProps {
    handleDuplicateSelected: () => void;
    handleDeleteSelected: () => void;
    handlerSelectAll: () => void;
    selectedIds: Set<number>;
    users: UserGithub[];
}

const UserControl: React.FC<UserControlProps> = function (
    {handleDuplicateSelected, handleDeleteSelected, handlerSelectAll, selectedIds, users}
) {

    const [isSticky, setIsSticky] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSticky(!entry.isIntersecting);
            },
            {
                rootMargin: '-70px 0px 0px 0px',
                threshold: 0
            }
        );

        if (sentinel) {
            observer.observe(sentinel);
        }

        return () => {
            if (sentinel) {
                observer.unobserve(sentinel);
            }
        };
    }, []);

    return (
        <>
            <div ref={sentinelRef} />
            <div className={`${styles.userControlOuter} ${isSticky ? styles.userControlScroll : ''}`}>
                <div className="site-width">
                    <div className={styles.userControl + ' container'}>
                        <div>
                            <div className={styles.userControlSelectAll}>
                                <Checkbox checked={users.length === selectedIds.size}
                                          onChange={handlerSelectAll}
                                          classNameCheckbox={styles.userControlSelectAllCheckbox}
                                          label={selectedIds.size + ' elements selected'}
                                          preChecked={selectedIds.size > 0}
                                          name="selectAll"
                                />
                            </div>
                        </div>
                        <div>
                            <button aria-label="Delete user selected"
                                    name="deleteSelected"
                                    className={styles.userControlButton}
                                    onClick={handleDeleteSelected}>
                                <DeleteIcon />
                            </button>
                            <button aria-label="Duplicate user selected"
                                    name="duplicateSelected"
                                    className={styles.userControlButton}
                                    onClick={handleDuplicateSelected}>
                                <CopyIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserControl;
