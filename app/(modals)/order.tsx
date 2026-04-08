import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
// import { UISafeArea } from '@/components/ui/ui-safe-area';
import { UIText } from '@/components/ui/ui-text';
import { UIView } from '@/components/ui/ui-view';
import { useTheme } from '@/lib/theme/theme-provider';

export default function OrderModalScreen() {
  const { colors } = useTheme();
  const { id, ticker, name, price, profit } = useLocalSearchParams<{
    id?: string;
    ticker?: string;
    name?: string;
    price?: string;
    profit?: string;
  }>();

  return (
    // <UISafeArea>
    <UIView style={styles.container}>
      <UIView
        style={[
          styles.card,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
          },
        ]}
      >
        <UIText color="muted">{`id: ${id ?? '-'}`}</UIText>
        <UIText color="muted">{`ticker: ${ticker ?? '-'}`}</UIText>
        <UIText color="muted">{`nombre: ${name ?? '-'}`}</UIText>
        <UIText color="muted">{`precio: ${price ?? '-'}`}</UIText>
        <UIText color="muted">{`profit: ${profit ?? '-'}`}</UIText>
      </UIView>
    </UIView>
    // </UISafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    gap: 8,
    padding: 16,
  },
});
