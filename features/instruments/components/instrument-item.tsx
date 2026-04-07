import { UIText } from '@/components/ui/ui-text';
import { UITrend } from '@/components/ui/ui-trend';
import { InstrumentProfit } from '../types';
import { UIView } from '@/components/ui/ui-view';
import { useTheme } from '@/lib/theme/theme-provider';
import { TickerLogo } from '@/components/ui/ticker-logo';
import { formatPeso } from '@/lib/format-peso';
import { StyleSheet } from 'react-native';

export function InstrumentItem({ item }: { item: InstrumentProfit }) {
  const { colors } = useTheme();
  const logo = item.ticker.toUpperCase();
  return (
    <UIView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <UIView style={styles.row}>
        {logo && <TickerLogo ticker={logo} />}
        <UIView style={styles.content}>
          <UIText style={{ fontWeight: 'bold' }}>{item.ticker}</UIText>
          <UIText color="muted" ellipsizeMode="tail" numberOfLines={1}>
            {item.name}
          </UIText>
        </UIView>
        <UIView style={styles.values}>
          <UIText style={{ fontWeight: 'bold' }}>{formatPeso(item.last_price)}</UIText>
          <UITrend value={item.profit} />
        </UIView>
      </UIView>
    </UIView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  content: { flexDirection: 'column', flex: 1, minWidth: 0 },
  values: { flexDirection: 'column', marginLeft: 'auto', alignItems: 'flex-end', gap: 4 },
});
