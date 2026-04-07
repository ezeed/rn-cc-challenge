import { Feather } from '@expo/vector-icons';
import { UIText } from './ui-text';
import { useTheme } from '@/lib/theme/theme-provider';

export function UITrend({ value }: { value: number }) {
  const { colors } = useTheme();
  const displayValue = Number(value.toFixed(2));
  const isPositive = displayValue > 0;
  const isNegative = displayValue < 0;

  return (
    <UIText
      style={{ color: isPositive ? colors.success : isNegative ? colors.danger : colors.text }}
    >
      {isPositive ? (
        <Feather name="arrow-up" size={18} color={colors.success} />
      ) : isNegative ? (
        <Feather name="arrow-down" size={18} color={colors.danger} />
      ) : null}
      {`${displayValue.toFixed(2)}%`}
    </UIText>
  );
}
