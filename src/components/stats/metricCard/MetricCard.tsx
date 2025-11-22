import styles from './MetricCard.module.css';

interface MetricCardProps {
    title: string;
    value: string | number;
}

export const MetricCard = ({ title, value }: MetricCardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.title}>{title}</div>
            <div className={styles.value}>{value}</div>
        </div>
    );
};