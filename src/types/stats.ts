export type PeriodType = 'today' | 'week' | 'month';
export interface DailyActivity {
    date: string;
    count: number;
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

export interface PeriodOption {
    value: PeriodType;
    label: string;
}