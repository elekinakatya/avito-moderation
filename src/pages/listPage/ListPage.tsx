import styles from "./ListPage.module.css"
import {Filters} from "../../components/forList/filters/Filters.tsx";
import {Card} from "../../components/forList/card/Card.tsx";
import {useEffect, useMemo, useState} from "react";
import {SearchBar} from "../../components/forList/searchBar/SearchBar.tsx";
import type {AdStatus, SortOption} from "../../types";
import {Pagination} from "../../components/forList/pagination/Pagination.tsx";
import {MainHeader} from "../../components/mainHeader/MainHeader.tsx";
import {type AdsParams, type AdsResponse, fetchAds} from "../../api/ads.ts";

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
    const [adsParams, setAdsParams] = useState<AdsParams>({
        page: 1,
        limit: ADS_PER_PAGE,
        sortBy: 'createdAt',
        sortOrder: 'desc'
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

    const handleSearchChange = (search: string) => {
        setAdsParams(prev => ({
            ...prev,
            search: search || undefined,
            page: 1
        }));
    };

    const handleStatusChange = (status: AdStatus[]) => {
        setAdsParams(prev => ({
            ...prev,
            status: status.length > 0 ? status : undefined,
            page: 1
        }));
    };

    const handleCategoriesChange = (categories: string[]) => {
        const categoryIds = categories.map(categoryNameToId);
        setAdsParams(prev => ({
            ...prev,
            categoryId: categoryIds.length > 0 ? categoryIds[0] : undefined,
            page: 1
        }));
    };

    const handlePriceRangeChange = (priceRange: { min: number | null; max: number | null }) => {
        setAdsParams(prev => ({
            ...prev,
            minPrice: priceRange.min || undefined,
            maxPrice: priceRange.max || undefined,
            page: 1
        }));
    };

    const handleSortChange = (sort: SortOption) => {
        const { sortBy, sortOrder } = sortOptionToApiParams(sort);
        setAdsParams(prev => ({
            ...prev,
            sortBy,
            sortOrder,
            page: 1
        }));
    };

    const handlePageChange = (page: number) => {
        setAdsParams(prev => ({
            ...prev,
            page
        }));
    };

    const handleResetFilters = () => {
        setAdsParams({
            page: 1,
            limit: ADS_PER_PAGE,
            sortBy: 'createdAt',
            sortOrder: 'desc'
        });
    };

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