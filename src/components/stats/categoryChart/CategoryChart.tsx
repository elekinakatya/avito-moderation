import styles from './CategoryChart.module.css';

interface CategoryChartProps {
    data: Record<string, number>;
    title?: string;
}

export const CategoryChart = ({ data, title = "Распределение по категориям" }: CategoryChartProps) => {
    const categories = Object.entries(data);
    const totalCount = categories.reduce((sum, [, count]) => sum + count, 0);
    const maxCount = Math.max(...categories.map(([, count]) => count), 0);

    return (
        <div className={styles.chart}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.bars}>
                {categories.map(([category, count], index) => {
                    const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
                    const width = maxCount > 0 ? (count / maxCount) * 100 : 0;

                    return (
                        <div key={index} className={styles.barContainer}>
                            <div className={styles.category}>{category}</div>
                            <div className={styles.barBackground}>
                                <div
                                    className={styles.bar}
                                    style={{ width: `${width}%` }}
                                />
                            </div>
                            <div className={styles.stats}>
                                <span className={styles.count}>{count}</span>
                                <span className={styles.percentage}>({percentage.toFixed(1)}%)</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            {categories.length === 0 && (
                <div className={styles.empty}>Нет данных по категориям</div>
            )}
        </div>
    );
};