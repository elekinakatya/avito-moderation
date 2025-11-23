// api/stats.ts
export interface StatsParams {
    period?: string;
    startDate?: string;
    endDate?: string;
}

export interface StatsSummary {
    totalReviewed: number;
    totalReviewedToday: number;
    totalReviewedThisWeek: number;
    totalReviewedThisMonth: number;
    approvedPercentage: number;
    rejectedPercentage: number;
    requestChangesPercentage: number;
    averageReviewTime: number;
}

export interface ActivityData {
    date: string;
    approved: number;
    rejected: number;
    requestChanges: number;
}

export interface DecisionsData {
    approved: number;
    rejected: number;
    requestChanges: number;
}

export const fetchStatsSummary = async (params: StatsParams = {}): Promise<StatsSummary> => {
    try {
        const url = new URL('/api/stats/summary', window.location.origin);

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, value.toString());
            }
        });

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching stats summary:', error);
        throw error;
    }
};

export const fetchActivityData = async (params: StatsParams = {}): Promise<ActivityData[]> => {
    try {
        const url = new URL('/api/stats/chart/activity', window.location.origin);

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, value.toString());
            }
        });

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching activity data:', error);
        throw error;
    }
};

export const fetchDecisionsData = async (params: StatsParams = {}): Promise<DecisionsData> => {
    try {
        const url = new URL('/api/stats/chart/decisions', window.location.origin);

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, value.toString());
            }
        });

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching decisions data:', error);
        throw error;
    }
};

export const fetchCategoriesData = async (params: StatsParams = {}): Promise<Record<string, number>> => {
    try {
        const url = new URL('/api/stats/chart/categories', window.location.origin);

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, value.toString());
            }
        });

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching categories data:', error);
        throw error;
    }
};