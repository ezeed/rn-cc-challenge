import { InstrumentProfit } from '../types';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { InstrumentItem } from './instrument-item';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';

type Props = {
  instruments: InstrumentProfit[];
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
};

export function InstrumentsList({ instruments, isLoading, error, onRetry }: Props) {
  if (isLoading) {
    return <ActivityIndicator size="large" accessibilityLabel="Cargando instrumentos..." />;
  }

  if (error) {
    return (
      <ErrorState
        message={`Error al cargar los instrumentos: ${error?.message || ''}`}
        onRetry={onRetry}
      />
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      data={instruments}
      ListEmptyComponent={<EmptyState message="No hay instrumentos para mostrar." />}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRetry} />}
      keyExtractor={(instrument) => instrument.id}
      renderItem={({ item: instrument }) => <InstrumentItem item={instrument} />}
    />
  );
}
