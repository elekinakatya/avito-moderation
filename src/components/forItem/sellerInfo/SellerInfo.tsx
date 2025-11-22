import styles from './SellerInfo.module.css';

interface SellerInfoProps {
    seller: {
        name: string;
        rating: number;
        adsCount: number;
        registrationDate: string;
    };
}

export const SellerInfo = ({ seller }: SellerInfoProps) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU');
    };

    const getRegistrationDuration = (registrationDate: string) => {
        const regDate = new Date(registrationDate);
        const now = new Date();
        const years = now.getFullYear() - regDate.getFullYear();
        return years;
    };

    return (
        <div className={styles.sellerInfo}>
            <div className={styles.sellerDetails}>
                <div className={styles.sellerName}>
                    <span className={styles.name}>Продавец: {seller.name}</span>
                    <div className={styles.rating}>
                        Рейтинг: {seller.rating}
                    </div>
                </div>

                <div className={styles.sellerStats}>
                    <div className={styles.stat}>
                        <span className={styles.statValue}>{seller.adsCount}</span>
                        <span className={styles.statLabel}>объявлений</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statValue}>{getRegistrationDuration(seller.registrationDate)}</span>
                        <span className={styles.statLabel}>лет на сайте</span>
                    </div>
                </div>

                <div className={styles.registrationDate}>
                    Дата регистрации: {formatDate(seller.registrationDate)}
                </div>
            </div>
        </div>
    );
};