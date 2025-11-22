import type {Ad} from '../types';

export const mockAds: Ad[] = [
    {
        id: '1',
        title: 'iPhone 13 Pro',
        price: 85000,
        category: 'Смартфоны',
        createdAt: '2024-01-15T10:30:00Z',
        status: 'approved',
        priority: 'urgent',
        description: 'Отличное состояние, батарея 100%, все функции работают. Продаю в связи с переходом на новую модель. В комплекте оригинальная коробка, кабель и документы.',
        images: [
            'https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=iPhone+Front',
            'https://via.placeholder.com/600x400/10B981/FFFFFF?text=iPhone+Back',
            'https://via.placeholder.com/600x400/EF4444/FFFFFF?text=iPhone+Side',
            'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=iPhone+Box'
        ],
        characteristics: [
            { key: 'Бренд', value: 'Apple' },
            { key: 'Модель', value: 'iPhone 13 Pro' },
            { key: 'Память', value: '256 ГБ' },
            { key: 'Цвет', value: 'Graphite' },
            { key: 'Состояние', value: 'Отличное' },
            { key: 'Гарантия', value: 'До 2025 года' }
        ],
        seller: {
            id: '1',
            name: 'Александр',
            rating: 4.8,
            adsCount: 15,
            registrationDate: '2022-03-15'
        }
    },
    {
        id: '2',
        title: 'Ноутбук MacBook Air M2',
        price: 120000,
        category: 'Ноутбуки',
        createdAt: '2024-01-10T14:20:00Z',
        status: 'moderation',
        priority: 'normal',
        description: 'Новый MacBook Air с чипом M2. Использовался 2 месяца, в идеальном состоянии. Полная комплектация.',
        images: [
            'https://via.placeholder.com/600x400/6366F1/FFFFFF?text=MacBook+Open',
            'https://via.placeholder.com/600x400/EC4899/FFFFFF?text=MacBook+Closed',
            'https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=MacBook+Side'
        ],
        characteristics: [
            { key: 'Бренд', value: 'Apple' },
            { key: 'Модель', value: 'MacBook Air M2' },
            { key: 'Память', value: '512 ГБ' },
            { key: 'Оперативная память', value: '16 ГБ' },
            { key: 'Диагональ', value: '13.6"' },
            { key: 'Цвет', value: 'Space Gray' }
        ],
        seller: {
            id: '2',
            name: 'Мария',
            rating: 4.9,
            adsCount: 8,
            registrationDate: '2023-01-20'
        }
    }
];