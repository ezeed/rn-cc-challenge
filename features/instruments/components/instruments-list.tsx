import { InstrumentProfit } from '../types';
import { FlatList, RefreshControl } from 'react-native';
import { InstrumentItem } from './instrument-item';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { UILoading } from '@/components/ui/ui-loading';
import { useTheme } from '@/lib/theme/theme-provider';

type Props = {
  instruments: InstrumentProfit[];
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
};

export function InstrumentsList({ instruments, isLoading, error, onRetry }: Props) {
  const { colors } = useTheme();

  if (isLoading) {
    return <UILoading accessibilityLabel="Cargando instrumentos..." />;
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
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRetry}
          tintColor={colors.primary}
          colors={[colors.primary]}
          progressBackgroundColor={colors.surface}
        />
      }
      keyExtractor={(instrument) => instrument.id}
      renderItem={({ item: instrument }) => <InstrumentItem item={instrument} />}
    />
  );
}
