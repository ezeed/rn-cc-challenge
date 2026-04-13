import { PortfolioProfit } from '../types';
import { FlatList, RefreshControl } from 'react-native';
import { PortfolioItem } from './portfolio-item';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { UILoading } from '@/components/ui/ui-loading';
import { useTheme } from '@/lib/theme/theme-provider';

type Props = {
  portfolio: PortfolioProfit[];
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
};

export function PortfolioList({ portfolio, isLoading, error, onRetry }: Props) {
  const { colors } = useTheme();

  if (isLoading) {
    return <UILoading accessibilityLabel="Cargando portfolio..." />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={onRetry} />;
  }

  return (
    <FlatList
      data={portfolio}
      contentContainerStyle={{ flexGrow: 1 }}
      ListEmptyComponent={<EmptyState message="No hay elementos en el Portfolio para mostrar." />}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRetry}
          tintColor={colors.primary}
          colors={[colors.primary]}
          progressBackgroundColor={colors.surface}
        />
      }
      keyExtractor={(portfolio, index) => `${portfolio.instrument_id}-${portfolio.ticker}-${index}`}
      renderItem={({ item: instrument }) => <PortfolioItem item={instrument} />}
    />
  );
}
