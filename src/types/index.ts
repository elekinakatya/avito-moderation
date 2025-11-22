export interface Seller {
    id: string;
    name: string;
    rating: number;
    adsCount: number;
    registrationDate: string;
}

export interface AdCharacteristic {
    key: string;
    value: string;
}

export interface Ad {
    id: string;
    title: string;
    price: number;
    category: string;
    createdAt: string;
    status: AdStatus;
    priority: 'normal' | 'urgent';
    description: string;
    images: string[];
    characteristics: AdCharacteristic[];
    seller: Seller;
}

export type AdStatus = 'moderation' | 'approved' | 'rejected';
export type SortOption = 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'priority_high';