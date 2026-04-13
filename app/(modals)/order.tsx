import { useLocalSearchParams } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { OrderForm, OrderInstrumentSummary } from '@/features/orders';
import { UISafeArea } from '@/components/ui/ui-safe-area';
import { ScrollView } from 'react-native-gesture-handler';
import { ErrorState } from '@/components/error-state';

export default function OrderModalScreen() {
  const { id, ticker, name, price } = useLocalSearchParams<{
    id?: string;
    ticker?: string;
    name?: string;
    price?: string;
  }>();

  if (!id || !ticker || !name || !price) {
    return <ErrorState message="No se encontró el instrumento seleccionado." />;
  }

  const instrumentId = Number(id);

  return (
    <UISafeArea>
      <ScrollView
        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <OrderInstrumentSummary instrument={{ ticker, name, price }} />
        <OrderForm instrument={{ id: instrumentId, ticker, name, price }} />
      </ScrollView>
    </UISafeArea>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 20,
    paddingBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
