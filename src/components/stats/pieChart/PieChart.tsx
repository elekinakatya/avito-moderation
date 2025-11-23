import styles from './PieChart.module.css';

interface PieChartProps {
    data: {
        approved: number;
        rejected: number;
        requestChanges: number;
    };
    title?: string;
}

export const PieChart = ({ data, title = "Распределение решений" }: PieChartProps) => {
    // Преобразуем данные API в формат для компонента
    const total = data.approved + data.rejected + data.requestChanges;

    const chartData = [
        {
            status: 'approved' as const,
            count: data.approved,
            percentage: total > 0 ? (data.approved / total) * 100 : 0
        },
        {
            status: 'rejected' as const,
            count: data.rejected,
            percentage: total > 0 ? (data.rejected / total) * 100 : 0
        },
        {
            status: 'revision' as const,
            count: data.requestChanges,
            percentage: total > 0 ? (data.requestChanges / total) * 100 : 0
        }
    ];

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

        chartData.forEach((item, index) => {
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
                    {chartData.map((item) => (
                        <div key={item.status} className={styles.legendItem}>
                            <div
                                className={styles.colorDot}
                                style={{ backgroundColor: getStatusColor(item.status) }}
                            />
                            <span className={styles.label}>{getStatusText(item.status)}</span>
                            <span className={styles.percentage}>{item.percentage.toFixed(1)}%</span>
                            <span className={styles.count}>({item.count})</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};