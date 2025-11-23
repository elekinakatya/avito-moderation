import styles from "./ListPage.module.css"
import {Filters} from "../../components/forList/filters/Filters.tsx";
import {Card} from "../../components/forList/card/Card.tsx";
import {useEffect, useMemo, useState} from "react";
import {SearchBar} from "../../components/forList/searchBar/SearchBar.tsx";
import type {AdStatus, SortOption} from "../../types";
import {Pagination} from "../../components/forList/pagination/Pagination.tsx";
import {MainHeader} from "../../components/mainHeader/MainHeader.tsx";
import {type AdsParams, type AdsResponse, fetchAds} from "../../api/ads.ts";
import { useSearchParams } from "react-router-dom";

const ADS_PER_PAGE = 10;

const CATEGORIES = [
    'Электроника',
    'Недвижимость',
    'Транспорт',
    'Работа',
    'Услуги',
    'Животные',
    'Мода',
    'Детское'
];

const categoryNameToId = (categoryName: string): number => {
    return CATEGORIES.indexOf(categoryName);
};

const categoryIdToName = (categoryId: number): string => {
    return CATEGORIES[categoryId] || '';
};

export const ListPage = () => {
    const [ads, setAds] = useState<AdsResponse>();
    const [searchParams, setSearchParams] = useSearchParams();

    const initialPage = parseInt(searchParams.get('page') || '1');
    const initialSearch = searchParams.get('search') || undefined;

    const [adsParams, setAdsParams] = useState<AdsParams>({
        page: initialPage,
        limit: ADS_PER_PAGE,
        sortBy: 'createdAt',
        sortOrder: 'desc',
        search: initialSearch
    });

    const sortOptionToApiParams = (sortOption: SortOption): { sortBy: string; sortOrder: string } => {
        switch (sortOption) {
            case 'newest':
                return { sortBy: 'createdAt', sortOrder: 'desc' };
            case 'oldest':
                return { sortBy: 'createdAt', sortOrder: 'asc' };
            case 'price_asc':
                return { sortBy: 'price', sortOrder: 'asc' };
            case 'price_desc':
                return { sortBy: 'price', sortOrder: 'desc' };
            case 'priority_high':
                return { sortBy: 'priority', sortOrder: 'desc' };
            default:
                return { sortBy: 'createdAt', sortOrder: 'desc' };
        }
    };

    const updateUrlParams = (params: AdsParams) => {
        const newSearchParams = new URLSearchParams();

        if (params.page && params.page > 1) {
            newSearchParams.set('page', params.page.toString());
        }

        if (params.search) {
            newSearchParams.set('search', params.search);
        }

        setSearchParams(newSearchParams);
    };

    const handleSearchChange = (search: string) => {
        const newParams = {
            ...adsParams,
            search: search || undefined,
            page: 1
        };
        setAdsParams(newParams);
    };

    const handleStatusChange = (status: AdStatus[]) => {
        const newParams = {
            ...adsParams,
            status: status.length > 0 ? status : undefined,
            page: 1
        };
        setAdsParams(newParams);
    };

    const handleCategoriesChange = (categories: string[]) => {
        const categoryIds = categories.map(categoryNameToId);
        const newParams = {
            ...adsParams,
            categoryId: categoryIds.length > 0 ? categoryIds[0] : undefined,
            page: 1
        };
        setAdsParams(newParams);
    };

    const handlePriceRangeChange = (priceRange: { min: number | null; max: number | null }) => {
        const newParams = {
            ...adsParams,
            minPrice: priceRange.min || undefined,
            maxPrice: priceRange.max || undefined,
            page: 1
        };
        setAdsParams(newParams);
    };

    const handleSortChange = (sort: SortOption) => {
        const { sortBy, sortOrder } = sortOptionToApiParams(sort);
        const newParams = {
            ...adsParams,
            sortBy,
            sortOrder,
            page: 1
        };
        setAdsParams(newParams);
    };

    const handlePageChange = (page: number) => {
        const newParams = {
            ...adsParams,
            page
        };
        setAdsParams(newParams);
    };

    const handleResetFilters = () => {
        const newParams = {
            page: 1,
            limit: ADS_PER_PAGE,
            sortBy: 'createdAt',
            sortOrder: 'desc'
        };
        setAdsParams(newParams);
    };

    useEffect(() => {
        updateUrlParams(adsParams);
    }, [adsParams]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetchAds(adsParams);
                setAds(response);
            } catch (error) {
                console.error('Error fetching ads:', error);
            }
        })();
    }, [adsParams]);

    const displayData = useMemo(() => {
        if (!ads) return { ads: [], total: 0 };

        return {
            ads: ads.ads,
            total: ads.pagination.totalItems
        };
    }, [ads]);

    const paginationData = useMemo(() => {
        if (!ads) {
            return {
                totalPages: 0,
                currentAds: [],
                startIndex: 0,
                endIndex: 0,
                totalAds: 0
            };
        }

        const totalAds = ads.pagination.totalItems;
        const totalPages = ads.pagination.totalPages;
        const currentAds = ads.ads;
        const startIndex = (ads.pagination.currentPage - 1) * ADS_PER_PAGE + 1;
        const endIndex = Math.min(ads.pagination.currentPage * ADS_PER_PAGE, totalAds);

        return {
            totalPages,
            currentAds,
            startIndex,
            endIndex,
            totalAds
        };
    }, [ads]);

    const goToNextPage = () => {
        if (adsParams.page && paginationData.totalPages && adsParams.page < paginationData.totalPages) {
            handlePageChange(adsParams.page + 1);
        }
    };

    const goToPrevPage = () => {
        if (adsParams.page && adsParams.page > 1) {
            handlePageChange(adsParams.page - 1);
        }
    };

    const getCurrentFiltersState = () => {
        const selectedCategories = adsParams.categoryId !== undefined
            ? [categoryIdToName(adsParams.categoryId)].filter(Boolean)
            : [];

        return {
            selectedStatus: adsParams.status as AdStatus[] || [],
            selectedCategories,
            selectedSort: (() => {
                if (adsParams.sortBy === 'createdAt' && adsParams.sortOrder === 'desc') return 'newest';
                if (adsParams.sortBy === 'createdAt' && adsParams.sortOrder === 'asc') return 'oldest';
                if (adsParams.sortBy === 'price' && adsParams.sortOrder === 'asc') return 'price_asc';
                if (adsParams.sortBy === 'price' && adsParams.sortOrder === 'desc') return 'price_desc';
                if (adsParams.sortBy === 'priority') return 'priority_high';
                return 'newest';
            })() as SortOption,
            selectedPriceRange: {
                min: adsParams.minPrice || null,
                max: adsParams.maxPrice || null
            }
        };
    };

    const currentFilters = getCurrentFiltersState();

    if (!ads) {
        return 'loading ads...';
    }

    return (
        <div className={styles.page}>
            <MainHeader></MainHeader>
            <div className={styles.filtersSticky}>
                <SearchBar
                    onSearch={handleSearchChange}
                ></SearchBar>
            </div>
            <div className={styles.content}>
                <aside className={styles.sidebar}>
                    <Filters
                        selectedStatus={currentFilters.selectedStatus}
                        onStatusChange={handleStatusChange}
                        selectedCategories={currentFilters.selectedCategories}
                        selectedSort={currentFilters.selectedSort}
                        selectedPriceRange={currentFilters.selectedPriceRange}
                        onPriceRangeChange={handlePriceRangeChange}
                        onCategoriesChange={handleCategoriesChange}
                        onSortChange={handleSortChange}
                        onReset={handleResetFilters}
                    />
                </aside>
                <main className={styles.main}>
                    {adsParams.search && displayData.total === 0 && (
                        <div className={styles.empty}>
                            По запросу "{adsParams.search}" ничего не найдено
                        </div>
                    )}

                    {!adsParams.search && displayData.total === 0 && (
                        <div className={styles.empty}>
                            Объявления не найдены
                        </div>
                    )}

                    <div className={styles.cards}>
                        {displayData.ads.map(ad => (
                            <Card key={ad.id} ad={ad}/>
                        ))}
                    </div>
                    <div className={styles.totalResults}>
                        {paginationData.totalPages > 0 && (
                            <Pagination
                                currentPage={adsParams.page || 1}
                                totalPages={paginationData.totalPages}
                                totalAds={paginationData.totalAds}
                                startIndex={paginationData.startIndex}
                                endIndex={paginationData.endIndex}
                                onPageChange={handlePageChange}
                                onNextPage={goToNextPage}
                                onPrevPage={goToPrevPage}
                            />
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}