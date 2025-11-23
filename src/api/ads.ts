import type {Advertisement} from "./models.ts";

export interface AdsParams {
    page?: number;
    limit?: number;
    status?: string[];
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
}

export interface AdsResponse {
    ads: Advertisement[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

export const fetchAds = async (params: AdsParams = {}): Promise<AdsResponse> => {
    try {
        const url = new URL('/api/ads', window.location.origin);

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    value.forEach(item => url.searchParams.append(key, item.toString()));
                } else {
                    url.searchParams.append(key, value.toString());
                }
            }
        });

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching ads:', error);
        throw error;
    }
};

export const fetchAdById = async (id: number | string): Promise<Advertisement> => {
    try {
        const url = `/api/ads/${id}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching ads:', error);
        throw error;
    }
};