import type { Ad } from '../types';

export const mockAds: Ad[] = [
    {
        id: '1',
        title: 'iPhone 13 Pro 256GB в отличном состоянии',
        price: 75000,
        category: 'Смартфоны',
        status: 'pending',
        priority: 'urgent',
        createdAt: '2025-01-15T10:30:00Z',
        images: ['https://placehold.co/120x120'],
    },
    {
        id: '2',
        title: 'Диван угловой новый с доставкой',
        price: 25000,
        category: 'Мебель',
        status: 'approved',
        priority: 'normal',
        createdAt: '2025-01-14T15:20:00Z',
        images: ['https://placehold.co/120x120'],
    },
    {
        id: '3',
        title: 'Ноутбук ASUS ROG для игр',
        price: 120000,
        category: 'Ноутбуки',
        status: 'rejected',
        priority: 'urgent',
        createdAt: '2025-01-16T09:15:00Z',
        images: ['https://placehold.co/120x120'],
    },
    {
        id: '4',
        title: 'Велосипед горный 2023 года',
        price: 35000,
        category: 'Спорт',
        status: 'pending',
        priority: 'normal',
        createdAt: '2025-01-13T11:45:00Z',
        images: ['https://placehold.co/120x120'],
    }
];