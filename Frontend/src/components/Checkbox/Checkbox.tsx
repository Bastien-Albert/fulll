import React from 'react';
import styles from './Checkbox.module.css';
import SquareIcon from "../Icon/SquareIcon.tsx";
import CheckSquareIcon from "../Icon/CheckSquareIcon.tsx";
import MinusSquareIcon from "../Icon/MinusSquareIcon.tsx";

type FancyCheckboxProps = {
    name?: string;
    checked: boolean;
    onChange: () => void;
    label?: string;
    preChecked?: boolean;
    classNameCheckbox?: string;
};

const Checkbox: React.FC<FancyCheckboxProps> = ({ name, checked, onChange, label, classNameCheckbox, preChecked = false}) => {
    const id = React.useId();

    return (
        <label htmlFor={id} className={styles.wrapper}>
            <input
                id={id}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className={styles.input}
            />
            <span className={styles.custom}>
                <span className={styles.customContent + ' ' + classNameCheckbox}>
                    {checked ? <CheckSquareIcon /> : (preChecked ? <MinusSquareIcon /> :<SquareIcon />)}
                </span>
            </span>
            {label && <span className={styles.label}>{label}</span>}
        </label>
    );
};

export default Checkbox;