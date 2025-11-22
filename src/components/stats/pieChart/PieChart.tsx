import styles from './PieChart.module.css';

interface DecisionStats {
    status: 'approved' | 'rejected' | 'revision';
    count: number;
    percentage: number;
}

interface PieChartProps {
    data: DecisionStats[];
    title?: string;
}

export const PieChart = ({ data, title = "Распределение решений" }: PieChartProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return '#97CF26';
            case 'rejected': return '#FF6163';
            case 'revision': return '#fd9a00';
            default: return '#6c757d';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'approved': return 'Одобрено';
            case 'rejected': return 'Отклонено';
            case 'revision': return 'На доработку';
            default: return status;
        }
    };

    const getPieBackground = () => {
        let gradient = '';
        let currentPercent = 0;

        data.forEach((item, index) => {
            const color = getStatusColor(item.status);
            const start = currentPercent;
            const end = currentPercent + item.percentage;

            if (index === 0) {
                gradient = `${color} 0% ${end}%`;
            } else {
                gradient += `, ${color} ${start}% ${end}%`;
            }

            currentPercent = end;
        });

        return `conic-gradient(${gradient})`;
    };

    return (
        <div className={styles.pieChart}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.content}>
                <div className={styles.chart}>
                    <div
                        className={styles.pie}
                        style={{ background: getPieBackground() }}
                    />
                </div>
                <div className={styles.legend}>
                    {data.map((item) => (
                        <div key={item.status} className={styles.legendItem}>
                            <div
                                className={styles.colorDot}
                                style={{ backgroundColor: getStatusColor(item.status) }}
                            />
                            <span className={styles.label}>{getStatusText(item.status)}</span>
                            <span className={styles.percentage}>{item.percentage}%</span>
                            <span className={styles.count}>({item.count})</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};