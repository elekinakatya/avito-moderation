export type AdStatus = 'pending' | 'approved' | 'rejected';
export type AdPriority = 'normal' | 'urgent';

export interface Ad {
    id: string;
    title: string;
    price: number;
    category: string;
    status: AdStatus;
    priority: AdPriority;
    createdAt: string;
    images: string[];
}