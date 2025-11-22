import styles from './CategoryChart.module.css';

interface CategoryStats {
    category: string;
    count: number;
    percentage: number;
}

interface CategoryChartProps {
    data: CategoryStats[];
    title?: string;
}

export const CategoryChart = ({ data, title = "Распределение по категориям" }: CategoryChartProps) => {
    const maxCount = Math.max(...data.map(item => item.count));

    return (
        <div className={styles.chart}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.bars}>
                {data.map((item, index) => {
                    const width = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                    return (
                        <div key={index} className={styles.barContainer}>
                            <div className={styles.category}>{item.category}</div>
                            <div className={styles.barBackground}>
                                <div
                                    className={styles.bar}
                                    style={{ width: `${width}%` }}
                                />
                            </div>
                            <div className={styles.stats}>
                                <span className={styles.count}>{item.count}</span>
                                <span className={styles.percentage}>({item.percentage}%)</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};