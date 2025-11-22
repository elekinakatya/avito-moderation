import styles from "./Filters.module.css"
import Select from 'react-select'
import type {AdStatus, SortOption} from "../../types";
import * as React from "react";

interface SortOptionType {
    label: string;
    value: SortOption;
}
interface FiltersProps {
    selectedStatus: AdStatus[];
    selectedCategories: string[];
    selectedPriceRange: {
        min: number | null;
        max: number | null;
    };
    selectedSort: SortOption;
    onStatusChange: (status: AdStatus[]) => void;
    onCategoriesChange: (categories: string[]) => void;
    onPriceRangeChange: (priceRange: {min: number | null; max: number | null }) => void;
    onSortChange: (sort: SortOption) => void;

    onReset: () => void;
}
interface StatusOption {
    label: string;
    value: AdStatus;
}
interface CategoryOption {
    label: string;
    value: string;
}
export const Filters = ({
                            selectedStatus, selectedPriceRange, selectedCategories,
                            selectedSort,onStatusChange,
                            onPriceRangeChange, onSortChange, onCategoriesChange,
                            onReset}:
                        FiltersProps) => {
    const statusOptions: StatusOption[] = [
        { value: 'pending', label: 'На модерации' },
        { value: 'approved', label: 'Одобрено' },
        { value: 'rejected', label: 'Отклонено' }
    ];

    const sortOptions: SortOptionType[] = [
        { value: 'newest', label: 'Новые' },
        { value: 'oldest', label: 'Старые' },
        { value: 'price_asc', label: 'Дешевые' },
        { value: 'price_desc', label: 'Дорогие' },
        { value: 'priority_high', label: 'Срочные' },
    ];
    const categoryOptions: CategoryOption[] = [
        { value: 'electronics', label: 'Электроника' },
        { value: 'clothing', label: 'Одежда' },
        { value: 'home', label: 'Дом и сад' },
        { value: 'sports', label: 'Спорт и отдых' },
        { value: 'auto', label: 'Авто' },
        { value: 'realestate', label: 'Недвижимость' },
        { value: 'services', label: 'Услуги' },
        { value: 'jobs', label: 'Работа' },
    ];
    const handleStatusChange = (selectedStatus: readonly StatusOption[] | null) => {
        if (selectedStatus) {
            const selectedValue = selectedStatus.map(option => option.value);
            onStatusChange(selectedValue);
        } else {
            onStatusChange([])
        }
    }
    const handleCategoriesChange = (selectedOptions: readonly CategoryOption[] | null) => {
        if (selectedOptions) {
            const selectedValue = selectedOptions.map(option => option.value);
            onCategoriesChange(selectedValue);
        } else {
            onCategoriesChange([])
        }
    }

    const handleSortChange = (selectedOption: SortOptionType | null) => {
        if (selectedOption) {
            onSortChange(selectedOption.value);
        } else {
            onSortChange('newest');
        }
    }
    const getSelectedSortOption = (): SortOptionType | null => {
        return sortOptions.find(option => option.value === selectedSort) || null;
    }

    const getSelectedStatusOptions = (): StatusOption[] => {
        return statusOptions.filter(option =>
            selectedStatus.includes(option.value)
        );
    }
    const getSelectedCategoryOptions = (): CategoryOption[] => {
        return categoryOptions.filter((option: CategoryOption) =>
            selectedCategories.includes(option.value)
        );
    }
    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        let value;
        if (inputValue === '') {
            value = null;
        } else {
            value = parseInt(inputValue);
        }
        onPriceRangeChange({
            ...selectedPriceRange,
            min: value
        })
    }
    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        let value;
        if (inputValue === '') {
            value = null;
        } else {
            value = parseInt(inputValue);
        }
        onPriceRangeChange({
            ...selectedPriceRange,
            max: value
        })
    }

    return (
        <div className={styles.filtersScrollable}>
            <div className={styles.filtersColumn}>
                <div className={styles.filterGroup}>
                    <label>Категория</label>
                    <Select
                        isMulti
                        name="categories"
                        value={getSelectedCategoryOptions()}
                        options={categoryOptions}
                        onChange={handleCategoriesChange}
                        className={styles.select}
                        classNamePrefix="select"
                        placeholder="Выберите категории..."
                    />
                </div>
                <div className={styles.filterGroup}>
                    <label>Статус объявления</label>
                    <Select
                        isMulti
                        name="select"
                        value={getSelectedStatusOptions()}
                        options={statusOptions}
                        onChange={handleStatusChange}
                        className={styles.select}
                        classNamePrefix="select"
                        placeholder="Статус..."
                    />
                </div>
                <div className={styles.filterGroupPrice}>
                    <label className={styles.labelPrice}>Диапазон цены</label>
                    <div className={styles.priceInputs}>
                        <input
                            type="number"
                            placeholder="От"
                            min={0}
                            value={selectedPriceRange.min || ''}
                            onChange={handleMinPriceChange}
                            className={styles.priceInput}
                        />
                        <input
                            type="number"
                            placeholder="До"
                            value={selectedPriceRange.max || ''}
                            onChange={handleMaxPriceChange}
                            className={styles.priceInput}
                        />
                    </div>
                </div>
                <div className={styles.sort}>
                    <label>Сортировка</label>
                    <Select
                        name="sort"
                        options={sortOptions}
                        value={getSelectedSortOption()}
                        onChange={handleSortChange}
                        className={styles.sort}
                        classNamePrefix="sortSelect"
                        placeholder="Показывать сначала..."
                        isSearchable={false}
                    />
                </div>
                <button
                    className={styles.resetButton}
                    onClick={onReset}
                >
                    Сбросить все фильтры
                </button>
            </div>
        </div>
    )
}