import styles from './ActivityChart.module.css';

interface DailyActivity {
    date: string;
    count: number;
}

interface ActivityChartProps {
    data: DailyActivity[];
    title?: string;
}

export const ActivityChart = ({ data, title = "Активность по дням" }: ActivityChartProps) => {
    const maxCount = Math.max(...data.map(item => item.count));

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short'
        });
    };

    const getBarHeight = (count: number) => {
        if (maxCount === 0) return 0;
        return (count / maxCount) * 100;
    };

    return (
        <div className={styles.chart}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.chartContainer}>
                <div className={styles.bars}>
                    {data.map((item, index) => {
                        const height = getBarHeight(item.count);
                        return (
                            <div key={index} className={styles.barWrapper}>
                                <div className={styles.barContainer}>
                                    <div
                                        className={styles.bar}
                                        style={{ height: `${height}%` }}
                                        title={`${item.count} объявлений`}
                                    >
                                        <div className={styles.barValue}>{item.count}</div>
                                    </div>
                                </div>
                                <div className={styles.label}>{formatDate(item.date)}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};