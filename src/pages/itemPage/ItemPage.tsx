import {Gallery} from "../../components/forItem/gallery/Gallery.tsx";
import styles from "./itemPage.module.css"
import {useNavigate, useParams} from "react-router-dom";
import {History} from "../../components/forItem/history/History.tsx";
import {SellerInfo} from "../../components/forItem/sellerInfo/SellerInfo.tsx";
import {Characteristics} from "../../characteristics/Characteristics.tsx";
import {Description} from "../../components/forItem/description/Description.tsx";
import {useEffect, useState} from "react";
import {RejectModal} from "../../components/forItem/rejectModal/RejectModal.tsx";
import {MainHeader} from "../../components/mainHeader/MainHeader.tsx";
import type {Advertisement} from "../../api/models.ts";
import {approveAd, fetchAdById, fetchAds, rejectAd, requestChanges} from "../../api/ads.ts";

export const ItemPage = () => {
    const {id} = useParams<{id: string}>();
    const [ad, setAd] = useState<Advertisement>();
    const [allAds, setAllAds] = useState<Advertisement[]>([]);
    const navigate = useNavigate();
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

    useEffect(() => {
        (async () => {
            if (!id) return;
            try {
                const adResponse = await fetchAdById(id);
                setAd(adResponse);

                // да плохо, да говно, я понимаю,
                // но это надо, чтобы показывать есть ли предыдущее/следующее,
                // тк бек отдает не полную инфу в пагинации
                const adsResponse = await fetchAds({
                    page: 1,
                    limit: 1000
                });
                setAllAds(adsResponse.ads);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [id]);

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

    const currentIndex = allAds.findIndex(item => item.id.toString() === id);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < allAds.length - 1 && currentIndex !== -1;

    const handleApprove = (id: number) => {
        approveAd(id).then((res) => {
            alert(res.message);
        });
    }

    const handleReject = () => {
        setIsRejectModalOpen(true);
    };

    const handleConfirmReject = (id: number, reason: string) => {
        rejectAd(id, {reason: reason}).then((res) => {
            alert(res.message);
        });
        setIsRejectModalOpen(false);
    };

    const handleImprove = (id: number) => {
        // TODO: send request changes with proper comment for user
        requestChanges(id, {reason: 'Комментарий'}).then((res) => {
            alert(res.message);
        });
    };

    const handlePrev = () => {
        if (hasPrev) {
            const prevAd = allAds[currentIndex - 1];
            navigate(`/item/${prevAd.id}`);
        }
    };

    const handleNext = () => {
        if (hasNext) {
            const nextAd = allAds[currentIndex + 1];
            navigate(`/item/${nextAd.id}`);
        }
    };

    // обработка клавиш пока скип, может потом доделаю, не сердчайте
    // useEffect(() => {
    //     const handleKeyPress = (event: KeyboardEvent) => {
    //         if (isRejectModalOpen || document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
    //             return;
    //         }
    //
    //         switch (event.key.toLowerCase()) {
    //             case 'a':
    //                 event.preventDefault();
    //                 handleApprove(ad.id);
    //                 break;
    //             case 'd':
    //                 event.preventDefault();
    //                 handleReject();
    //                 break;
    //             case 'r':
    //                 event.preventDefault();
    //                 handleImprove(ad.id);
    //                 break;
    //         }
    //     };
    //
    //     const handleKeyDown = (event: KeyboardEvent) => {
    //         if (isRejectModalOpen || document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
    //             return;
    //         }
    //
    //         switch (event.key) {
    //             case 'ArrowLeft':
    //                 event.preventDefault();
    //                 handlePrev();
    //                 break;
    //             case 'ArrowRight':
    //                 event.preventDefault();
    //                 handleNext();
    //                 break;
    //         }
    //     };
    //
    //     document.addEventListener('keypress', handleKeyPress);
    //     document.addEventListener('keydown', handleKeyDown);
    //
    //     return () => {
    //         document.removeEventListener('keypress', handleKeyPress);
    //         document.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, [isRejectModalOpen, ad, hasPrev, hasNext, currentIndex, allAds]);

    return (
        <div className={styles.page}>
            <MainHeader />
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
                            disabled={!hasPrev}
                        >
                            ← Предыдущее
                        </button>
                        <button
                            className={`${styles.navButton} ${styles.nextButton}`}
                            onClick={handleNext}
                            disabled={!hasNext}
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
                    <SellerInfo seller={ad.seller} />
                </div>
                <div className={styles.moderationPanel}>
                    <div className={styles.moderationActions}>
                        <button
                            className={`${styles.moderationButton} ${styles.approveButton}`}
                            onClick={() => handleApprove(ad.id)}
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
                            onClick={() => handleImprove(ad.id)}
                        >
                            Вернуть на доработку
                        </button>
                    </div>
                </div>
            </div>
            <RejectModal
                isOpen={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                onConfirm={(reason) => handleConfirmReject(ad.id, reason)}
            />
        </div>
    )
}