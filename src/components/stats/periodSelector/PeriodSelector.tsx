import styles from './PeriodSelector.module.css';
import type { PeriodType } from '../../../types/stats.ts';

interface PeriodOption {
    value: PeriodType;
    label: string;
}

interface PeriodSelectorProps {
    options: PeriodOption[];
    selected: PeriodType;
    onSelect: (value: PeriodType) => void;
}

export const PeriodSelector = ({ options, selected, onSelect }: PeriodSelectorProps) => {
    return (
        <div className={styles.selector}>
            {options.map((option) => (
                <button
                    key={option.value}
                    className={`${styles.option} ${selected === option.value ? styles.active : ''}`}
                    onClick={() => onSelect(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};