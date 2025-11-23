import styles from './MetricCard.module.css';

interface MetricCardProps {
    title: string;
    value: string | number;
}

export const MetricCard = ({ title, value }: MetricCardProps) => {
    const formatValue = (val: string | number, titleText: string): string => {
        if (typeof val === 'string' && val.includes('%')) {
            const numberPart = val.replace('%', '');
            const number = parseFloat(numberPart);
            if (!isNaN(number)) {
                return `${number.toFixed(2)}%`;
            }
        }

        const isTimeCard = titleText.toLowerCase().includes('время');

        if (isTimeCard) {
            const seconds = typeof val === 'string' ? parseFloat(val) : val;
            if (!isNaN(seconds as number)) {
                return formatTime(seconds as number);
            }
        }

        if (typeof val === 'number') {
            return val.toString();
        }

        return val;
    };

    const formatTime = (seconds: number): string => {
        if (seconds < 60) {
            return `${Math.round(seconds)} сек`;
        } else if (seconds < 3600) {
            const minutes = Math.round(seconds / 60);
            return `${minutes} мин`;
        } else {
            const hours = seconds / 3600;
            return `${hours.toFixed(1)} ч`;
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.title}>{title}</div>
            <div className={styles.value}>{formatValue(value, title)}</div>
        </div>
    );
};