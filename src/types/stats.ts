export type PeriodType = 'today' | 'week' | 'month' | 'custom';

export interface DailyActivity {
    date: string;
    count: number;
    approved: number;
    rejected: number;
    requestChanges: number;
}
export interface DecisionStats {
    status: 'approved' | 'rejected' | 'revision';
    count: number;
    percentage: number;
}

export interface CategoryStats {
    category: string;
    count: number;
    percentage: number;
}
export interface StatsData {
    period: PeriodType;
    checked: number;
    approved: number;
    rejected: number;
    averageTime: number;
    activity: DailyActivity[];
    decisions: DecisionStats[];
    categories: CategoryStats[];
}

export const PeriodOptions = [
    { value: 'today' as PeriodType, label: 'Сегодня' },
    { value: 'week' as PeriodType, label: '7д' },
    { value: 'month' as PeriodType, label: '30д' }
];