import { useState, useEffect } from 'react';
import styles from './StatsPage.module.css';
import { periodOptions } from '../../mocks/statsData';
import { MetricCard } from '../../components/stats/metricCard/MetricCard.tsx';
import { PeriodSelector } from '../../components/stats/periodSelector/PeriodSelector.tsx';
import type { PeriodType } from '../../types/stats';
import { MainHeader } from "../../components/mainHeader/MainHeader.tsx";
import { ActivityChart } from "../../components/stats/activityChart/ActivityChart.tsx";
import { CategoryChart } from "../../components/stats/categoryChart/CategoryChart.tsx";
import { PieChart } from "../../components/stats/pieChart/PieChart.tsx";
import {
    fetchStatsSummary,
    fetchActivityData,
    fetchDecisionsData,
    fetchCategoriesData,
    type StatsSummary,
    type ActivityData,
    type DecisionsData
} from '../../api/stats.ts';

export const StatsPage = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('today');
    const [statsSummary, setStatsSummary] = useState<StatsSummary | null>(null);
    const [activityData, setActivityData] = useState<ActivityData[]>([]);
    const [decisionsData, setDecisionsData] = useState<DecisionsData | null>(null);
    const [categoriesData, setCategoriesData] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStatsData = async () => {
            try {
                setLoading(true);
                setError(null);

                const params = { period: selectedPeriod };

                const [summary, activity, decisions, categories] = await Promise.all([
                    fetchStatsSummary(params),
                    fetchActivityData(params),
                    fetchDecisionsData(params),
                    fetchCategoriesData(params)
                ]);

                setStatsSummary(summary);
                setActivityData(activity);
                setDecisionsData(decisions);
                setCategoriesData(categories);
            } catch (err) {
                console.error('Error loading stats data:', err);
                setError('Не удалось загрузить статистику');
            } finally {
                setLoading(false);
            }
        };

        loadStatsData();
    }, [selectedPeriod]);

    if (loading) {
        return (
            <div className={styles.page}>
                <MainHeader />
                <div className={styles.loading}>Загрузка статистики...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.page}>
                <MainHeader />
                <div className={styles.error}>{error}</div>
            </div>
        );
    }

    if (!statsSummary || !decisionsData) {
        return (
            <div className={styles.page}>
                <MainHeader />
                <div className={styles.error}>Данные не найдены</div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <MainHeader />
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
                        title="Всего проверено"
                        value={statsSummary.totalReviewed.toString()}
                    />
                    <MetricCard
                        title="Одобрено"
                        value={`${statsSummary.approvedPercentage}%`}
                    />
                </div>

                <div className={styles.metricsRow}>
                    <MetricCard
                        title="Отклонено"
                        value={`${statsSummary.rejectedPercentage}%`}
                    />
                    <MetricCard
                        title="Ср. время"
                        value={`${statsSummary.averageReviewTime} сек`}
                    />
                </div>
            </div>

            <div className={styles.chartsGrid}>
                <div className={styles.chartColumn}>
                    <ActivityChart
                        data={activityData}
                        title={`Активность за ${periodOptions.find(p => p.value === selectedPeriod)?.label.toLowerCase()}`}
                    />
                    <CategoryChart
                        data={categoriesData}
                        title="Распределение по категориям"
                    />
                </div>
                <div className={styles.chartColumn}>
                    <PieChart
                        data={decisionsData}
                        title="Распределение решений"
                    />
                </div>
            </div>
        </div>
    );
};