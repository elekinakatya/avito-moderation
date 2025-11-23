export type AdStatus = 'pending' | 'approved' | 'rejected' | 'draft';
export type PriorityLevel = 'normal' | 'urgent';

export type ModerationReason =
    | 'Запрещенный товар'
    | 'Неверная категория'
    | 'Некорректное описание'
    | 'Проблемы с фото'
    | 'Подозрение на мошенничество'
    | 'Другое';

export type ModerationAction = 'approved' | 'rejected' | 'requestChanges';

export interface Seller {
    id: number;
    name: string;
    rating: string;
    totalAds: number;
    registeredAt: string;
}

export interface ModerationHistory {
    id: number;
    moderatorId: number;
    moderatorName: string;
    action: ModerationAction;
    reason: ModerationReason | null;
    comment: string | null;
    timestamp: string;
}

export interface Advertisement {
    id: number;
    title: string;
    description: string;
    price: number;

    category: string;
    categoryId: number;

    status: AdStatus;
    priority: PriorityLevel;

    createdAt: string;
    updatedAt: string;

    images: string[];

    seller: Seller;

    characteristics: {
        [key: string]: string;
    };

    moderationHistory: ModerationHistory[];
}