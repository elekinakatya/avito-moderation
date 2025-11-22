import styles from './Characteristics.module.css';

export interface Characteristic {
    key: string;
    value: string;
}

interface CharacteristicsProps {
    characteristics: Characteristic[];
}

export const Characteristics = ({ characteristics }: CharacteristicsProps) => {
    if (!characteristics || characteristics.length === 0) {
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
                    {characteristics.map((char, index) => (
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