import {Gallery} from "../../components/forItem/gallery/Gallery.tsx";
import styles from "./itemPage.module.css"
import { mockAds } from '../../mocks/data'
import {useNavigate, useParams} from "react-router-dom";
import {History} from "../../components/forItem/history/History.tsx";
import {SellerInfo} from "../../components/forItem/sellerInfo/SellerInfo.tsx";
import {Characteristics} from "../../characteristics/Characteristics.tsx";
import {Description} from "../../components/forItem/description/Description.tsx";
import {useEffect, useState} from "react";
import {RejectModal} from "../../components/forItem/rejectModal/RejectModal.tsx";
import {MainHeader} from "../../components/mainHeader/MainHeader.tsx";


export const ItemPage = () => {
    const {id} = useParams<{id: string}>();
    const ad = mockAds.find(ad => ad.id === id);
    const navigate = useNavigate();
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

    if (!ad) {
        return (
            <div className={styles.page}>
                <div className={styles.notFound}>
                    <h2>Объявление не найдено</h2>
                    <button
                        className={styles.backButton}
                        onClick={() => navigate('/list')}
                    >
                        Вернуться к списку
                    </button>
                </div>
            </div>
        );
    }

    const currentIndex = mockAds.findIndex(item => item.id === id);
    const prevAd = currentIndex > 0 ? mockAds[currentIndex - 1] : null;
    const nextAd = currentIndex < mockAds.length - 1 ? mockAds[currentIndex + 1] : null;

    const handleApprove = () => {
        console.log('Одобрить объявление:', ad.id);
    }

    const handleReject = () => {
        setIsRejectModalOpen(true);
    };

    const handleConfirmReject = (reason: string) => {
        console.log('Отклонить объявление:', ad.id, 'Причина:', reason);
    };

    const handleImprove = () => {
        console.log('Отправить на доработку:', ad.id);
    };

    const handlePrev = () => {
        if (prevAd) {
            navigate(`/item/${prevAd.id}`);
        }
    };

    const handleNext = () => {
        if (nextAd) {
            navigate(`/item/${nextAd.id}`);
        }
    };

    // useEffect ДОЛЖЕН использовать актуальные значения
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (isRejectModalOpen || document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
                return;
            }

            switch (event.key.toLowerCase()) {
                case 'a':
                    event.preventDefault();
                    handleApprove();
                    break;
                case 'd':
                    event.preventDefault();
                    handleReject();
                    break;
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (isRejectModalOpen || document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
                return;
            }

            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    // Вызываем handlePrev напрямую
                    if (currentIndex > 0) {
                        navigate(`/item/${mockAds[currentIndex - 1].id}`);
                    }
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    // Вызываем handleNext напрямую
                    if (currentIndex < mockAds.length - 1) {
                        navigate(`/item/${mockAds[currentIndex + 1].id}`);
                    }
                    break;
            }
        };

        document.addEventListener('keypress', handleKeyPress);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isRejectModalOpen, currentIndex, navigate]);

    return (
        <div className={styles.page}>
            <MainHeader></MainHeader>
            <div className={styles.navigation}>
                <div className={styles.navigationLeft}>
                    <button
                        className={styles.backButton}
                        onClick={() => navigate('/list')}
                    >
                        ← Назад к списку
                    </button>
                </div>

                <div className={styles.navButtons}>
                    <div className={styles.navigationRight}>
                        <button
                            className={`${styles.navButton} ${styles.prevButton}`}
                            onClick={handlePrev}
                            disabled={!prevAd}
                        >
                            ← Предыдущее
                        </button>
                        <button
                            className={`${styles.navButton} ${styles.nextButton}`}
                            onClick={handleNext}
                            disabled={!nextAd}
                        >
                            Следующее →
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.title}>
                <h3>{ad.title}</h3>
            </div>
            <div className={styles.content}>
                <div className={styles.topContent}>
                    <div className={styles.gallerySection}>
                        <Gallery images={ad.images} title={ad.title}/>
                    </div>
                    <div className={styles.historyMod}>
                        {ad.moderationHistory && ad.moderationHistory.length > 0 && (
                            <div className={styles.moderationHistory}>
                                <History actions={ad.moderationHistory} />
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.bottomContent}>
                    <Characteristics characteristics={ad.characteristics} />
                    <Description description={ad.description} />
                    <SellerInfo seller={ad.seller} ></SellerInfo>
                </div>
                <div className={styles.moderationPanel}>
                    <div className={styles.moderationActions}>
                        <button
                            className={`${styles.moderationButton} ${styles.approveButton}`}
                            onClick={handleApprove}
                        >
                            Одобрить
                        </button>
                        <button
                            className={`${styles.moderationButton} ${styles.rejectButton}`}
                            onClick={handleReject}
                        >
                            Отклонить
                        </button>
                        <button
                            className={`${styles.moderationButton} ${styles.improveButton}`}
                            onClick={handleImprove}
                        >
                            Вернуть на доработку
                        </button>
                    </div>
                </div>
            </div>
            <RejectModal
                isOpen={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                onConfirm={handleConfirmReject}
            />

        </div>

    )
}