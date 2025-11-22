import styles from "./ListPage.module.css"
import {Filters} from "../../components/filters/Filters.tsx"
import {mockAds} from "../../mocks/data.ts";
import {Card} from "../../components/card/Card.tsx";
import {useMemo, useState} from "react";
import {SearchBar} from "../../components/searchBar/SearchBar.tsx";
import type {AdStatus, SortOption} from "../../types";

const ADS_PER_PAGE = 10;
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalAds: number;
    startIndex: number;
    endIndex: number;
    onPageChange: (page: number) => void;
    onNextPage: () => void;
    onPrevPage: () => void;
}

const Pagination = ({
                        currentPage,
                        totalPages,
                        totalAds,
                        startIndex,
                        endIndex,
                        onPageChange,
                        onNextPage,
                        onPrevPage
                    }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        let adjustedStartPage = startPage;
        if (endPage - startPage + 1 < maxVisiblePages) {
            adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = adjustedStartPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className={styles.pagination}>
            <div className={styles.paginationControls}>
                <button
                    className={styles.paginationButton}
                    onClick={onPrevPage}
                    disabled={currentPage === 1}
                >
                    Назад
                </button>
                {getPageNumbers().map(page => (
                    <button
                        key={page}
                        className={`${styles.pageButton} ${currentPage === page ? styles.pageButtonActive : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                <button
                    className={styles.paginationButton}
                    onClick={onNextPage}
                    disabled={currentPage === totalPages}
                >
                    Вперед
                </button>
            </div>
            <div className={styles.paginationInfo}>
                Показано {startIndex}-{endIndex} из {totalAds} объявлений
            </div>
        </div>
    );
};

export const ListPage = () => {
    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<AdStatus[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState({
        min: null as number | null,
        max: null as number | null
    });
    const [selectedSort, setSelectedSort] = useState<SortOption>('newest');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);


    const filteredAds = useMemo(() => {
        let result = mockAds;
        if (search) {
            result = result.filter(ad =>
                ad.title.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (selectedCategories.length > 0) {
            result = result.filter(ad =>
                selectedCategories.includes(ad.category)
            );
        }
        if (selectedStatus.length > 0) {
            result = result.filter(ad => selectedStatus.includes(ad.status));
        }
        if (selectedPriceRange.min !== null) {
            result = result.filter(ad => ad.price >= selectedPriceRange.min!);
        }
        if (selectedPriceRange.max !== null) {
            result = result.filter(ad => ad.price <= selectedPriceRange.max!);
        }
        result = [...result].sort((a, b) => {
            switch (selectedSort) {
                case "newest":
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case "oldest":
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'price_asc':
                    return a.price - b.price;
                case 'price_desc':
                    return b.price - a.price;
                case 'priority_high':
                    if (a.priority === 'urgent' && b.priority !== 'urgent') return -1;
                    if (b.priority === 'urgent' && a.priority !== 'urgent') return 1;
                    return 0;
                default:
                    return 0;
            }
        });
        return result;
    }, [search, selectedStatus, selectedPriceRange, selectedSort, selectedCategories]);

    const paginationData = useMemo(() => {
        const totalAds = filteredAds.length;
        const totalPages = Math.ceil(totalAds / ADS_PER_PAGE);


        // индексы для текущей страницы
        const startIndex = (currentPage - 1) * ADS_PER_PAGE;
        const endIndex = startIndex + ADS_PER_PAGE;

        // объявления для текущей страницы
        const currentAds = filteredAds.slice(startIndex, endIndex);

        return {
            totalAds,
            totalPages,
            currentAds,
            startIndex: startIndex + 1,
            endIndex: Math.min(endIndex, totalAds)
        };
    }, [filteredAds, currentPage]);

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const goToNextPage = () => {
        if (currentPage < paginationData.totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleResetFilters = () => {
        setSelectedStatus([]);
        setSelectedCategories([]);
        setSelectedPriceRange({
            min: null,
            max: null
        });
        setSelectedSort('newest');
        setSearch("");
        setCurrentPage(1);
    };

    return (
        <div className={styles.page}>
            <div className={styles.filtersSticky}>
                <SearchBar onSearch={setSearch}></SearchBar>
            </div>
            <div className={styles.content}>
                <aside className={styles.sidebar}>
                    <Filters
                        selectedStatus={selectedStatus}
                        onStatusChange={setSelectedStatus}
                        selectedCategories={selectedCategories}
                        selectedSort={selectedSort}
                        selectedPriceRange={selectedPriceRange}
                        onPriceRangeChange={setSelectedPriceRange}
                        onCategoriesChange={setSelectedCategories}
                        onSortChange={setSelectedSort}
                        onReset={handleResetFilters}
                    />
                </aside>
                <main className={styles.main}>
                    {search && paginationData.totalAds === 0 && (
                        <div className={styles.empty}>
                            По запросу "{search}" ничего не найдено
                        </div>
                    )}

                    {!search && paginationData.totalAds === 0 && (
                        <div className={styles.empty}>
                            Объявления не найдены
                        </div>
                    )}

                    <div className={styles.cards}>
                        {paginationData.currentAds.map(ad => (
                            <Card key={ad.id} ad={ad}/>
                        ))}
                    </div>

                    {paginationData.totalPages > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={paginationData.totalPages}
                            totalAds={paginationData.totalAds}
                            startIndex={paginationData.startIndex}
                            endIndex={paginationData.endIndex}
                            onPageChange={goToPage}
                            onNextPage={goToNextPage}
                            onPrevPage={goToPrevPage}
                        />
                    )}

                    {paginationData.totalAds > 0 && (
                        <div className={styles.totalResults}>
                            Всего найдено: {paginationData.totalAds} объявлений
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}