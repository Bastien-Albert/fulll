import React, {useState} from "react";

import styles from './Header.module.css';
import SearchIcon from "../Icon/SearchIcon.tsx";
import LightIcon from "../Icon/LightIcon.tsx";
import Switch from "../Switch/Switch.tsx";
import TimeIcon from "../Icon/TimeIcon.tsx";

interface HeaderProps {
    query: string;
    setQuery: (value: string) => void;
    handleDarkMode: () => void;
    setEditMode: (value: boolean) => void;
    editMode: boolean;
}

const Header: React.FC<HeaderProps>  = function ({ query, setQuery, handleDarkMode, setEditMode, editMode }) {

    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    const handleEditMode = () => {
        if(editMode) {
            setEditMode(false);
        } else {
            setEditMode(true);
        }
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    Github Search
                </div>
                <div className={styles.searchInputContainer}>
                    <SearchIcon />
                    <input value={query}
                           type="text"
                           name="search"
                           onChange={(e) => setQuery(e.target.value)}
                           placeholder="Search"
                           className={styles.searchInput}
                    />
                </div>
                <div className={`${styles.mobileSearchOverlay} ${mobileSearchOpen ? styles.open : ''}`}>
                    <input
                        value={query}
                        type="text"
                        name="search-mobile"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search"
                        className={styles.mobileSearchInput}
                        autoFocus
                    />
                    <button id="button-close-search-mobile"
                            className={styles.closeButton}
                            onClick={() => setMobileSearchOpen(false)}>
                        <TimeIcon />
                    </button>
                </div>

                <div className={styles.headerControl}>
                    <div className={styles.headerControlContent + ' ' + styles.headerControlSearch}>
                        <button id="button-search-mobile"
                                className={styles.headerControlButton}
                                onClick={() => setMobileSearchOpen(true)}>
                            <SearchIcon />
                        </button>
                    </div>
                    <div className={styles.headerControlContent}>
                        <Switch name="editMode" checked={editMode} onChange={handleEditMode}/>
                    </div>
                    <div className={styles.headerControlContent}>
                        <button className={styles.headerControlButton} onClick={handleDarkMode} id="theme-switch-button" title="Switch Theme (black/white)">
                            <LightIcon />
                        </button>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header;