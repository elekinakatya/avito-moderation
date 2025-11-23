import styles from "./History.module.css"
import type {ModerationHistory} from "../../../api/models.ts";

export const History = ({ actions }: { actions: ModerationHistory[] }) => {
    const getDecisionText = (decision: string) => {
        switch (decision) {
            case 'approved':
                return 'Одобрено';
            case 'rejected':
                return 'Отклонено';
            case 'revision':
                return 'Возврат на доработку';
            default:
                return decision;
        }
    };

    const getDecisionColor = (decision: string) => {
        switch (decision) {
            case 'approved':
                return styles.approved;
            case 'rejected':
                return styles.rejected;
            case 'revision':
                return styles.revision;
            default:
                return '';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (actions.length === 0) {
        return (
            <div className={styles.history}>
                <h3 className={styles.title}>История модерации</h3>
                <div className={styles.empty}>
                    История модерации отсутствует
                </div>
            </div>
        );
    }

    return (
        <div className={styles.history}>
            <h3 className={styles.title}>История модерации</h3>

            <div className={styles.actionsList}>
                {actions.map((action, index) => (
                    <div key={action.id} className={styles.actionItem}>
                        <div className={styles.actionHeader}>
                            <div className={styles.moderatorInfo}>
                                <span className={styles.moderatorName}>
                                    {action.moderatorName}
                                </span>
                                <span className={styles.actionDate}>
                                    {formatDate(action.timestamp)}
                                </span>
                            </div>
                            <div className={`${styles.decision} ${getDecisionColor(action.action)}`}>
                                {getDecisionText(action.action)}
                            </div>
                        </div>

                        {action.comment && (
                            <div className={styles.comment}>
                                <strong>Комментарий:</strong> {action.comment}
                            </div>
                        )}

                        {index < actions.length - 1 && <div className={styles.divider} />}
                    </div>
                ))}
            </div>
        </div>
    );
}