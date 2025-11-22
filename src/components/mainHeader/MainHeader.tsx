import { Link, useLocation } from 'react-router-dom';
import styles from './MainHeader.module.css';

export const MainHeader = () => {
    const location = useLocation();

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    Avito Модерация
                </div>

                <nav className={styles.nav}>
                    <Link
                        to="/list"
                        className={`${styles.navLink} ${location.pathname === '/list' ? styles.active : ''}`}
                    >
                        Объявления
                    </Link>
                    <Link
                        to="/stats"
                        className={`${styles.navLink} ${location.pathname === '/stats' ? styles.active : ''}`}
                    >
                        Аналитика
                    </Link>
                </nav>
            </div>
        </header>
    );
};