import React from 'react';
import styles from './Switch.module.css';
import CheckIcon from "../Icon/CheckIcon.tsx";
import TimeIcon from "../Icon/TimeIcon.tsx";

interface SwitchProps {
    name?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = function ({ name, checked, onChange }) {
    return (
        <div className={styles.switch}>
            <input
                type="checkbox"
                className={styles.switchInput}
                name={name}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <label className={styles.switchControl}>
                <span className={styles.switchBackground}></span>
                <span className={styles.switchIcon}>
                    {checked ? <TimeIcon /> : <CheckIcon />}
                </span>
            </label>
        </div>
    );
};

export default Switch;
