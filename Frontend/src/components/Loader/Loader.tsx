import styles from './Loader.module.css';

const Loader = function () {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
        </div>
    )
}

export default Loader;