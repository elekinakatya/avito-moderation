import styles from "./SearchBar.module.css"
import {useState} from "react";

interface SearchBarProps {
    onSearch: (searchValue: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        onSearch(searchValue);
    };

    const handleClearSearch = () => {
        setSearchValue('');
        onSearch('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch(value);
    };

    return (
        <div className={styles.searchBarFixed}>
            <div className={styles.searchBarContent}>
                <div className={styles.searchContainer}>
                    <div className={styles.search}>
                        <input
                            type="text"
                            placeholder="Поиск по названию..."
                            className={styles.searchInput}
                            value={searchValue}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        />
                        {searchValue && (
                            <button
                                className={styles.clearButton}
                                onClick={handleClearSearch}
                                type="button"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <button
                        className={styles.searchButton}
                        onClick={handleSearch}
                    >
                        Найти
                    </button>
                </div>
            </div>
        </div>
    )
}