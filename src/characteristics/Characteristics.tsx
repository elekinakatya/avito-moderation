import styles from './Characteristics.module.css';

export interface Characteristic {
    key: string;
    value: string;
}

interface CharacteristicsProps {
    characteristics: { [key: string]: string }
}

export const Characteristics = ({ characteristics }: CharacteristicsProps) => {
    const characteristicsArray = Object.entries(characteristics).map(([key, value]) => ({
        key,
        value
    }));

    if (!characteristics || characteristicsArray.length === 0) {
        return (
            <div className={styles.characteristics}>
                <h3 className={styles.title}>Характеристики</h3>
                <div className={styles.empty}>
                    Характеристики не указаны
                </div>
            </div>
        );
    }

    return (
        <div className={styles.characteristics}>
            <h3 className={styles.title}>Характеристики</h3>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <tbody>
                    {characteristicsArray.map((char, index) => (
                        <tr key={index} className={styles.row}>
                            <td className={styles.key}>{char.key}</td>
                            <td className={styles.value}>{char.value}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};