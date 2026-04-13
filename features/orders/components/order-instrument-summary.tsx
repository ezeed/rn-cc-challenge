import { StyleSheet } from 'react-native';
import { TickerLogo } from '@/components/ui/ticker-logo';
import { UIText } from '@/components/ui/ui-text';
import { UIView } from '@/components/ui/ui-view';
import { formatPeso } from '@/lib/format-peso';
import { useTheme } from '@/lib/theme/theme-provider';
import { UIPressable } from '@/components/ui/ui-pressable';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

type Props = {
  instrument: {
    ticker: string;
    name: string;
    price: string;
  };
};

export function OrderInstrumentSummary({ instrument }: Props) {
  const { colors } = useTheme();
  const ticker = instrument.ticker.toUpperCase();
  const formattedPrice = formatPeso(Number(instrument.price));

  return (
    <>
      <UIView style={styles.header}>
        <UIPressable
          appearance="outline"
          onPress={() => router.back()}
          size="sm"
          style={styles.closeButton}
          accessibilityLabel="Cerrar"
        >
          <Feather color={colors.text} name="x" size={16} />
        </UIPressable>
      </UIView>
      <UIView
        style={[
          styles.card,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
          },
        ]}
      >
        <TickerLogo ticker={ticker} style={styles.logo} />

        <UIView style={styles.content}>
          <UIText style={styles.ticker}>{ticker}</UIText>
          <UIText color="muted" numberOfLines={1}>
            {instrument.name}
          </UIText>
        </UIView>

        <UIText style={styles.price}>{formattedPrice}</UIText>
      </UIView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    marginBottom: 0,
  },
  card: {
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  logo: {
    borderRadius: 12,
    height: 48,
    width: 48,
  },
  price: {
    fontWeight: '700',
    fontSize: 20,
  },
  ticker: {
    fontWeight: '700',
  },
  closeButton: {
    minWidth: 0,
  },
});
