import type { Advertisement } from "../types/ads.ts";

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

export interface ApproveAdResponse {
    message: string;
    ad: Advertisement;
}

export interface RejectAdRequest {
    reason: string;
    comment?: string;
}

export interface RejectAdResponse {
    message: string;
    ad: Advertisement;
}

export interface RequestChangesRequest {
    reason: string;
    comment?: string;
}

export interface RequestChangesResponse {
    message: string;
    ad: Advertisement;
}

export const fetchAds = async (params: AdsParams = {}): Promise<AdsResponse> => {
    try {
        const url = new URL('/api/v1/ads', window.location.origin);

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
        const url = `/api/v1/ads/${id}`;
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

export const approveAd = async (id: number): Promise<ApproveAdResponse> => {
    try {
        const response = await fetch(`/api/v1/ads/${id}/approve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Объявление с ID ${id} не найдено`);
            }
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error approving ad:', error);
        throw error;
    }
};

export const rejectAd = async (id: number, data: RejectAdRequest): Promise<RejectAdResponse> => {
    try {
        const response = await fetch(`/api/v1/ads/${id}/reject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Объявление с ID ${id} не найдено`);
            }
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error rejecting ad:', error);
        throw error;
    }
};

export const requestChanges = async (id: number, data: RequestChangesRequest): Promise<RequestChangesResponse> => {
    try {
        const response = await fetch(`/api/v1/ads/${id}/request-changes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Объявление с ID ${id} не найдено`);
            }
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error requesting changes for ad:', error);
        throw error;
    }
};