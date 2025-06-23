import React from "react";
import styles from './Pagination.module.css';

interface PaginationProps {
    page: number;
    totalPage: number;
    setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = function ({ page, totalPage, setPage}) {
    const output: (number | string)[] = [];

    for (let i = 1; i <= totalPage; i++) {
        if(i === 1) {
            output.push(i);
        }
        else if(i === totalPage){
            output.push(i);
        }
        else {
            if(page - 1 <= i && page + 1 >= i) {
                output.push(i);
            } else {
                if(page - 2 <= i && page + 2 >= i) {
                    output.push('...');
                }
            }
        }
    }

    return (
        <div className={styles.paginationContainer}>
            {output.map((item, index) =>
                item === '...' ? (
                    <span key={`dots-${index}`} className={styles.paginationButton}>...</span>
                ) : (
                    <button
                        key={item}
                        id={"paginationButton-" + item}
                        className={`${styles.paginationButton} ${item === page ? styles.paginationButtonPage : ''}`}
                        onClick={() => item === page ? null : setPage(Number(item))}
                    >
                        {item}
                    </button>
                )
            )}
        </div>
    );
}

export default Pagination;
