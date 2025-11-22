import styles from "./Card.module.css"
import type {Ad} from "../../types";

interface CardProps {
    ad: Ad;
}
const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}
const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU').format(price)+' ₽';
}
const getStatusText = (status: Ad['status']): string => {
    switch (status) {
        case 'approved': return 'Одобрено';
        case 'rejected': return 'Отклонено';
        case 'pending': return 'На модерации';
    }
}
const getPriorityText = (priority: Ad['priority']): string => {
    switch (priority) {
        case 'normal': return 'Обычный';
        case "urgent": return 'Срочный';
    }
}
const getColorStatus = (status: Ad['status']): string => {
    switch (status) {
        case 'approved': return '#97CF26';
        case 'rejected': return '#FF6163';
        case 'pending': return '#00AAFF';
        default: return '#A169F7';
    }
}
export const Card = ({ad}: CardProps)=> {
    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <img
                    src={ad.images[0]}
                    alt={ad.title}
                    className={styles.image}
                />
            </div>
            <div className={styles.content}>
                <div className={styles.textContent}>
                    <h3 className={styles.title}>{ad.title}</h3>
                    {ad.priority === 'urgent' && ( <div className={styles.priorityBadge}>
                        {getPriorityText(ad.priority)}
                    </div>)
                       }
                    <div className={styles.price}>{formatPrice(ad.price)}</div>
                    <div className={styles.meta}>
                        <span className={styles.category}>
                            {ad.category}
                        </span>
                        <span className={styles.date}>
                            {formatDate(ad.createdAt)}
                        </span>
                    </div>
                    <div className={styles.status}>
                        <span className={styles.statusBadge}
                        style={{ backgroundColor: getColorStatus(ad.status) }}
                        >{getStatusText(ad.status)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}