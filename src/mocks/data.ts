import type {Ad} from "../types";

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
            { key: 'Год выпуска', value: '2021' },
            { key: 'Память', value: '256 ГБ' },
            { key: 'Оперативная память', value: '6 ГБ' },
            { key: 'Цвет', value: 'Graphite' },
            { key: 'Экран', value: '6.1" Super Retina XDR' },
            { key: 'Процессор', value: 'Apple A15 Bionic' },
            { key: 'Камеры', value: '12 Мп + 12 Мп + 12 Мп' },
            { key: 'Аккумулятор', value: '3095 мАч' },
            { key: 'Состояние', value: 'Отличное' },
            { key: 'Комплектация', value: 'Оригинальная коробка, кабель, документы' },
            { key: 'Гарантия', value: 'До 2025 года' }
        ],
        seller: {
            id: '1',
            name: 'Александр',
            rating: 4.8,
            adsCount: 15,
            registrationDate: '2022-03-15'
        },
        moderationHistory: [
            {
                id: '1-1',
                moderatorName: 'Иван Петров',
                actionDate: '2024-01-16T09:30:00Z',
                decision: 'revision',
                comment: 'Необходимо добавить фотографии всех сторон телефона и подтверждение гарантии'
            },
            {
                id: '1-2',
                moderatorName: 'Мария Сидорова',
                actionDate: '2024-01-17T14:20:00Z',
                decision: 'approved',
                comment: 'Все требования выполнены, объявление соответствует правилам'
            }
        ]
    },
    {
        id: '2',
        title: 'Ноутбук MacBook Air M2',
        price: 120000,
        category: 'Ноутбуки',
        createdAt: '2024-01-10T14:20:00Z',
        status: 'pending',
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
            { key: 'Год выпуска', value: '2022' },
            { key: 'Память', value: '512 ГБ SSD' },
            { key: 'Оперативная память', value: '16 ГБ' },
            { key: 'Процессор', value: 'Apple M2' },
            { key: 'Диагональ экрана', value: '13.6 дюймов' },
            { key: 'Разрешение экрана', value: '2560 × 1664' },
            { key: 'Цвет', value: 'Space Gray' },
            { key: 'Операционная система', value: 'macOS Ventura' },
            { key: 'Аккумулятор', value: 'до 18 часов работы' },
            { key: 'Вес', value: '1.24 кг' },
            { key: 'Состояние', value: 'Идеальное' },
            { key: 'Комплектация', value: 'Оригинальная коробка, кабель USB-C' }
        ],
        seller: {
            id: '2',
            name: 'Мария',
            rating: 4.9,
            adsCount: 8,
            registrationDate: '2023-01-20'
        },
        moderationHistory: [
            {
                id: '2-1',
                moderatorName: 'Алексей Козлов',
                actionDate: '2024-01-11T11:15:00Z',
                decision: 'rejected',
                comment: 'Объявление нарушает правила размещения: не указана реальная цена'
            }
        ]
    },
    {
        id: '3',
        title: 'Фотокамера Canon EOS R6',
        price: 150000,
        category: 'Фототехника',
        createdAt: '2024-01-08T16:45:00Z',
        status: 'approved',
        priority: 'normal',
        description: 'Профессиональная беззеркальная камера. Использовалась в студийной съемке. В отличном состоянии.',
        images: [
            'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Canon+Front',
            'https://via.placeholder.com/600x400/06B6D4/FFFFFF?text=Canon+Back',
            'https://via.placeholder.com/600x400/84CC16/FFFFFF?text=Canon+Side'
        ],
        characteristics: [
            { key: 'Бренд', value: 'Canon' },
            { key: 'Модель', value: 'EOS R6' },
            { key: 'Тип', value: 'Беззеркальная камера' },
            { key: 'Матрица', value: '20.1 Мп Full Frame' },
            { key: 'Стабилизация', value: '5-осевая' },
            { key: 'Серийная съемка', value: '12 кадров/сек' },
            { key: 'Видео', value: '4K 60fps' },
            { key: 'Объектив в комплекте', value: 'RF 24-105mm f/4L' },
            { key: 'Состояние', value: 'Отличное' },
            { key: 'Количество срабатываний', value: '~15 000' },
            { key: 'Комплектация', value: 'Камера, объектив, батарея, зарядное устройство' }
        ],
        seller: {
            id: '3',
            name: 'Дмитрий',
            rating: 4.7,
            adsCount: 23,
            registrationDate: '2021-11-10'
        },
        moderationHistory: [
            {
                id: '3-1',
                moderatorName: 'Ольга Новикова',
                actionDate: '2024-01-09T10:20:00Z',
                decision: 'approved',
                comment: 'Все фотографии соответствуют товару, описание полное'
            }
        ]
    }
];