import { PortfolioProfit } from '../types';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { PortfolioItem } from './portfolio-item';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';

type Props = {
  portfolio: PortfolioProfit[];
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
};

export function PortfolioList({ portfolio, isLoading, error, onRetry }: Props) {
  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return (
      <ErrorState
        message={`Error al cargar el portfolio: ${error?.message || ''}`}
        onRetry={onRetry}
      />
    );
  }

  return (
    <FlatList
      data={portfolio}
      contentContainerStyle={{ flexGrow: 1 }}
      ListEmptyComponent={<EmptyState message="No hay elementos en el Portfolio para mostrar." />}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRetry} />}
      keyExtractor={(portfolio, index) => `${portfolio.instrument_id}-${portfolio.ticker}-${index}`}
      renderItem={({ item: instrument }) => <PortfolioItem item={instrument} />}
    />
  );
}
