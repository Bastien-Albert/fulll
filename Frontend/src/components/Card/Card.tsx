import React from "react";
import styles from './Card.module.css';

interface CardProps {
    children: React.ReactNode,
    className?: string,
    href?: string,
    target?: string,
}

const Card: React.FC<CardProps> = function({ children, className, href, target = '_blank' }) {
    if(href) {
        return (
            <a href={href} className={styles.card + ' ' + styles.cardA + ' ' + className} target={target}>
                {children}
            </a>
        )
    }

    return (
        <div className={styles.card + ' ' + className}>
            {children}
        </div>
    );
};

export default Card;