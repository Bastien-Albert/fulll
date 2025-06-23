import type {User as UserGithub} from "../../types/github.ts";
import React from "react";
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
    return (
        <div className={styles.userControl}>
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
    );
}

export default UserControl;
