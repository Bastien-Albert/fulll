import React from "react";
import type {User as UserGithub} from "../../types/github.ts";
import styles from "./User.module.css";
import ChevronRightIcon from "../Icon/ChevronRightIcon.tsx";
import Checkbox from "../Checkbox/Checkbox.tsx";
interface UserProps {
    user: UserGithub;
    setSelectedIds: (id: Set<number>) => void;
    selectedIds: Set<number>;
    editMode: boolean;
}

const User: React.FC<UserProps> = function (
    {user, setSelectedIds, selectedIds, editMode}
) {
    const handleOnChange = function (): void {
        const newSet = new Set(selectedIds);
        if(newSet.has(user.id)) {
            newSet.delete(user.id)
        } else {
            newSet.add(user.id)
        }
        setSelectedIds(newSet);
    }

    return (
        <div className={styles.userContainer}>
            {editMode && (
                <div className={styles.selectItem}>
                    <Checkbox
                        onChange={handleOnChange}
                        checked={selectedIds.has(user.id)}
                    />
                </div>
            )}
            <div className={styles.userContent}>
                <div className={styles.avatarContainer}>
                    <div className={styles.avatarContent}>
                        <img className={styles.avatar} src={user.avatar_url}
                             alt={'Avatar du compte gitbug de' + user.login}
                        />
                    </div>
                </div>
                <div className={styles.userMain}>
                    <p className={styles.userLogin}>{user.login}</p>
                    <p className={styles.userId}>{user.id}</p>
                </div>
            </div>
            <div className={styles.userFooter}>
                <span className={styles.userFooterA} >View profile <ChevronRightIcon /></span>
            </div>
        </div>
    );
}

export default User;
