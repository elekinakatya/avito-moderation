import { useState } from 'react';
import styles from './StatsPage.module.css';
import { mockStats, periodOptions } from '../../mocks/statsData';
import { MetricCard } from '../../components/stats/metricCard/MetricCard.tsx';
import { PeriodSelector } from '../../components/stats/periodSelector/PeriodSelector.tsx';
import type { PeriodType } from '../../types/stats';
import {MainHeader} from "../../components/mainHeader/MainHeader.tsx";
import {ActivityChart} from "../../components/stats/activityChart/ActivityChart.tsx";
import {CategoryChart} from "../../components/stats/categoryChart/CategoryChart.tsx";
import {PieChart} from "../../components/stats/pieChart/PieChart.tsx";

export const StatsPage = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('today');
    const stats = mockStats[selectedPeriod];

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <MainHeader></MainHeader>
                <h1 className={styles.title}>Статистика</h1>
                <div className={styles.periodSelector}>
                    <span className={styles.periodLabel}>Период:</span>
                    <PeriodSelector
                        options={periodOptions}
                        selected={selectedPeriod}
                        onSelect={setSelectedPeriod}
                    />
                </div>
            </div>

            <div className={styles.metricsContainer}>
                <div className={styles.metricsRow}>
                    <MetricCard
                        title="Проверено"
                        value={stats.checked}
                    />
                    <MetricCard
                        title="Одобрено"
                        value={`${stats.approved}%`}
                    />
                </div>

                <div className={styles.metricsRow}>
                    <MetricCard
                        title="Отклонено"
                        value={`${stats.rejected}%`}
                    />
                    <MetricCard
                        title="Ср. время"
                        value={`${stats.averageTime} мин`}
                    />
                </div>
            </div>
            <div className={styles.chartsGrid}>
                <div className={styles.chartColumn}>
                    <ActivityChart
                        data={stats.activity}
                        title={`Активность за последнюю неделю`}
                    />
                    <CategoryChart
                        data={stats.categories}
                        title={`Распределение по категориям`}
                    />
                </div>
                <div className={styles.chartColumn}>
                    <PieChart
                        data={stats.decisions}
                        title={`Распределение решений`}
                    />
                </div>
            </div>
        </div>
    );
};