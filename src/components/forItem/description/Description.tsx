import styles from './Description.module.css';

interface DescriptionProps {
    description: string;
}

export const Description = ({ description }: DescriptionProps) => {
    if (!description) {
        return (
            <div className={styles.description}>
                <h3 className={styles.title}>Описание</h3>
                <div className={styles.empty}>
                    Описание отсутствует
                </div>
            </div>
        );
    }

    return (
        <div className={styles.description}>
            <h3 className={styles.title}>Описание</h3>
            <div className={styles.content}>
                {description.split('\n').map((paragraph, index) => (
                    <p key={index} className={styles.paragraph}>
                        {paragraph}
                    </p>
                ))}
            </div>
        </div>
    );
};