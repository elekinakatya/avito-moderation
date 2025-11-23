import styles from "../../../pages/listPage/ListPage.module.css";

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

export const Pagination = ({
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

                {getPageNumbers()[0] > 1 && (
                    <>
                        <button
                            className={styles.pageButton}
                            onClick={() => onPageChange(1)}
                        >
                            1
                        </button>
                        {getPageNumbers()[0] > 2 && (
                            <span className={styles.pageDots}>...</span>
                        )}
                    </>
                )}

                {getPageNumbers().map(page => (
                    <button
                        key={page}
                        className={`${styles.pageButton} ${currentPage === page ? styles.activePageButton : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                    <>
                        {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                            <span className={styles.pageDots}>...</span>
                        )}
                        <button
                            className={styles.pageButton}
                            onClick={() => onPageChange(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </>
                )}

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