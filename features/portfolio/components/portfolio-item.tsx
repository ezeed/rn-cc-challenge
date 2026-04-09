import { UIText } from '@/components/ui/ui-text';
import { UITrend } from '@/components/ui/ui-trend';
import { PortfolioProfit } from '../types';
import { UIView } from '@/components/ui/ui-view';
import { useTheme } from '@/lib/theme/theme-provider';
import { formatPeso } from '@/lib/format-peso';
import { StyleSheet } from 'react-native';
import { TickerLogo } from '@/components/ui/ticker-logo';

export function PortfolioItem({ item }: { item: PortfolioProfit }) {
  const { colors } = useTheme();
  const totalReturnLabel = `${item.total_return >= 0 ? '+' : ''}${formatPeso(item.total_return)}`;

  return (
    <UIView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
      ]}
    >
      <UIView style={styles.header}>
        <TickerLogo ticker={item.ticker.toUpperCase()} />
        <UIView style={styles.headerContent}>
          <UIText style={{ fontWeight: 'bold' }}>{item.ticker}</UIText>
          <UIText color="muted" ellipsizeMode="tail" numberOfLines={1}>
            {item.quantity} acciones
          </UIText>
        </UIView>
        <UIView style={styles.headerValues}>
          <UIText style={{ fontWeight: 'bold' }}>{formatPeso(item.total_value)}</UIText>
          <UIText style={{ color: item.total_return >= 0 ? colors.success : colors.danger }}>
            {totalReturnLabel}
          </UIText>
        </UIView>
      </UIView>
      <UIView style={styles.details}>
        <UIView style={styles.detailRow}>
          <UIText color="muted">Rendimiento total</UIText>
          <UITrend value={item.profit} />
        </UIView>
      </UIView>
    </UIView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  headerContent: {
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  headerValues: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 4,
  },
  details: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
