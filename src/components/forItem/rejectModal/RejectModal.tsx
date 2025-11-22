import { useState } from 'react';
import styles from './RejectModal.module.css';

interface RejectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string, customReason?: string) => void;
}

const QUICK_REASONS = [
    'Запрещённый товар',
    'Неверная категория',
    'Некорректное описание',
    'Проблемы с фото',
    'Подозрение на мошенничество',
    'Другое'
];

export const RejectModal = ({ isOpen, onClose, onConfirm }: RejectModalProps) => {
    const [selectedReason, setSelectedReason] = useState('');
    const [customReason, setCustomReason] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (!selectedReason) return;

        const finalReason = selectedReason === 'Другое' && customReason ? customReason : selectedReason;
        onConfirm(finalReason, customReason);
        handleClose();
    };

    const handleClose = () => {
        setSelectedReason('');
        setCustomReason('');
        onClose();
    };

    const isOtherSelected = selectedReason === 'Другое';

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3 className={styles.title}>Укажите причину отклонения</h3>

                <div className={styles.reasons}>
                    {QUICK_REASONS.map((reason) => (
                        <label key={reason} className={styles.reasonLabel}>
                            <input
                                type="radio"
                                name="rejectReason"
                                value={reason}
                                checked={selectedReason === reason}
                                onChange={(e) => setSelectedReason(e.target.value)}
                                className={styles.radio}
                            />
                            <span className={styles.reasonText}>{reason}</span>
                        </label>
                    ))}
                </div>

                {isOtherSelected && (
                    <div className={styles.customReason}>
            <textarea
                placeholder="Опишите причину отклонения..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className={styles.textarea}
                rows={3}
            />
                    </div>
                )}
                <div className={styles.actions}>
                    <button
                        className={styles.cancelButton}
                        onClick={handleClose}
                    >
                        Отмена
                    </button>
                    <button
                        className={styles.confirmButton}
                        onClick={handleConfirm}
                        disabled={!selectedReason || (isOtherSelected && !customReason)}
                    >
                        Подтвердить отклонение
                    </button>
                </div>
            </div>
        </div>
    );
};