import type{ StatsData, PeriodType } from '../types/stats';

export const mockStats: Record<PeriodType, StatsData> = {
    today: {
        period: 'today',
        checked: 243,
        approved: 78,
        rejected: 15,
        averageTime: 2.3,
        activity: [
            { date: '2024-01-15', count: 18 },
            { date: '2024-01-16', count: 22 },
            { date: '2024-01-17', count: 25 },
            { date: '2024-01-18', count: 19 },
            { date: '2024-01-19', count: 28 },
            { date: '2024-01-20', count: 24 },
            { date: '2024-01-21', count: 20 }
        ],
        decisions: [
            { status: 'approved', count: 190, percentage: 78 },
            { status: 'rejected', count: 36, percentage: 15 },
            { status: 'revision', count: 17, percentage: 7 }
        ],
        categories: [
            { category: 'Электроника', count: 68, percentage: 28 },
            { category: 'Одежда', count: 54, percentage: 22 },
            { category: 'Мебель', count: 36, percentage: 15 },
            { category: 'Авто', count: 29, percentage: 12 },
            { category: 'Недвижимость', count: 24, percentage: 10 },
            { category: 'Другое', count: 32, percentage: 13 }
        ]
    },
    week: {
        period: 'week',
        checked: 1567,
        approved: 72,
        rejected: 18,
        averageTime: 2.8,
        activity: [
            { date: '2024-01-15', count: 210 },
            { date: '2024-01-16', count: 245 },
            { date: '2024-01-17', count: 280 },
            { date: '2024-01-18', count: 195 },
            { date: '2024-01-19', count: 315 },
            { date: '2024-01-20', count: 172 },
            { date: '2024-01-21', count: 150 }
        ],
        decisions: [
            { status: 'approved', count: 1128, percentage: 72 },
            { status: 'rejected', count: 282, percentage: 18 },
            { status: 'revision', count: 157, percentage: 10 }
        ],
        categories: [
            { category: 'Электроника', count: 423, percentage: 27 },
            { category: 'Одежда', count: 344, percentage: 22 },
            { category: 'Мебель', count: 235, percentage: 15 },
            { category: 'Авто', count: 188, percentage: 12 },
            { category: 'Недвижимость', count: 157, percentage: 10 },
            { category: 'Другое', count: 220, percentage: 14 }
        ]
    },
    month: {
        period: 'month',
        checked: 6421,
        approved: 68,
        rejected: 22,
        averageTime: 3.5,
        activity: [
            { date: '2024-01-15', count: 210 },
            { date: '2024-01-16', count: 245 },
            { date: '2024-01-17', count: 280 },
            { date: '2024-01-18', count: 195 },
            { date: '2024-01-19', count: 315 },
            { date: '2024-01-20', count: 172 },
            { date: '2024-01-21', count: 150 }
        ],
        decisions: [
            { status: 'approved', count: 4366, percentage: 68 },
            { status: 'rejected', count: 1413, percentage: 22 },
            { status: 'revision', count: 642, percentage: 10 }
        ],
        categories: [
            { category: 'Электроника', count: 1734, percentage: 27 },
            { category: 'Одежда', count: 1410, percentage: 22 },
            { category: 'Мебель', count: 963, percentage: 15 },
            { category: 'Авто', count: 770, percentage: 12 },
            { category: 'Недвижимость', count: 642, percentage: 10 },
            { category: 'Другое', count: 902, percentage: 14 }
        ]
    }
};

export const periodOptions = [
    { value: 'today' as PeriodType, label: 'Сегодня' },
    { value: 'week' as PeriodType, label: '7д' },
    { value: 'month' as PeriodType, label: '30д' }
];