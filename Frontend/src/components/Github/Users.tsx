import type Github from "../../types/github.ts";
import type { User as UserGithub } from "../../types/github.ts";
import Card from "../Card/Card.tsx";
import User from "./User.tsx";
import React from "react";
import styles from './Users.module.css';
import Pagination from "../Pagination/Pagination.tsx";
import DeleteIcon from "../Icon/DeleteIcon.tsx";
import CopyIcon from "../Icon/CopyIcon.tsx";
import Checkbox from "../Checkbox/Checkbox.tsx";

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
                <button className={styles.userControlButton} onClick={handleDeleteSelected}>
                    <DeleteIcon />
                </button>
                <button className={styles.userControlButton} onClick={handleDuplicateSelected}>
                    <CopyIcon />
                </button>
            </div>

        </div>
    );
}

interface UsersProps {
    usersPage: Record<number, UserGithub[]>;
    githubInfo: Github;
    page: number;
    setPage: (page: number) => void;
    setSelectedIds:  (ids: Set<number>) => void;
    setUsersPage: (usersPage: Record<number, UserGithub[]>) => void;
    selectedIds: Set<number>;
    editMode: boolean;
}

const Users: React.FC<UsersProps> = function (
    {usersPage, githubInfo, page, setPage, setSelectedIds, selectedIds, setUsersPage, editMode}
) {
    const handlerSelectAll = () => {
        if (selectedIds.size === usersPage[page].length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(usersPage[page].map(u => u.id)));
        }
    };

    const handleDuplicateSelected = () => {
        const selected = selectedIds;
        const originalList = usersPage[page];
        const newList: UserGithub[] = [];

        for (const user of originalList) {
            newList.push(user);
            if (selected.has(user.id)) {
                const randomInt = Math.floor(Math.random() * 100000)

                const duplicatedUser: UserGithub = {
                    ...user,
                    id: Math.ceil(user.id + randomInt),
                    duplicated: true,
                };
                newList.push(duplicatedUser);
            }
        }

        setUsersPage({
            ...usersPage,
            [page]: newList,
        });

        setSelectedIds(new Set());
    };

    const handleDeleteSelected = () => {
        usersPage[page] = usersPage[page].filter(user => !selectedIds.has(user.id));
        setUsersPage(usersPage);
        setSelectedIds(new Set());
    };

    return (
        <div>
            {editMode && <UserControl
                handleDuplicateSelected={handleDuplicateSelected}
                handleDeleteSelected={handleDeleteSelected}
                handlerSelectAll={handlerSelectAll}
                users={usersPage[page]}
                selectedIds={selectedIds}
            />}
            <div className={styles.usersContainer}>
                {usersPage[page].map((user: UserGithub) => (
                    <Card href={user.html_url} key={user.id} className={styles.userCard}>
                        <User selectedIds={selectedIds}
                              user={user}
                              setSelectedIds={setSelectedIds}
                              editMode={editMode}/>
                    </Card>
                ))}
            </div>
            <Pagination page={page} setPage={setPage} totalPage={githubInfo.totalPage}/>
        </div>
    )
}

export default Users;