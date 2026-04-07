import { InstrumentProfit } from '../types';
import { UIView } from '@/components/ui/ui-view';
import { UIPressable } from '@/components/ui/ui-pressable';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { InstrumentItem } from './instrument-item';
import { UIText } from '@/components/ui/ui-text';

type Props = {
  instruments: InstrumentProfit[];
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
};

export function InstrumentsList({ instruments, isLoading, error, onRetry }: Props) {
  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return (
      <UIView>
        <UIText style={{ marginBottom: 8 }}>
          {`Error al cargar los instrumentos: ${error?.message || ''}`}
        </UIText>
        <UIPressable variant="danger" onPress={onRetry} text="Reintentar" />
      </UIView>
    );
  }

  return (
    <FlatList
      data={instruments}
      ListEmptyComponent={<UIText>No hay instrumentos para mostrar.</UIText>}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRetry} />}
      keyExtractor={(instrument) => instrument.id}
      renderItem={({ item: instrument }) => <InstrumentItem item={instrument} />}
    />
  );
}
