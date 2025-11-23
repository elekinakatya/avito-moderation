import styles from './SellerInfo.module.css';
import type { Seller } from "../../../types/ads.ts";

interface SellerInfoProps {
    seller: Seller;
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
                        <span className={styles.statValue}>{seller.totalAds}</span>
                        <span className={styles.statLabel}>объявлений</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statValue}>{getRegistrationDuration(seller.registeredAt)}</span>
                        <span className={styles.statLabel}>лет на сайте</span>
                    </div>
                </div>

                <div className={styles.registrationDate}>
                    Дата регистрации: {formatDate(seller.registeredAt)}
                </div>
            </div>
        </div>
    );
};