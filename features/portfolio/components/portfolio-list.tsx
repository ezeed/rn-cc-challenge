import { PortfolioProfit } from '../types';
import { UIView } from '@/components/ui/ui-view';
import { UIPressable } from '@/components/ui/ui-pressable';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { UIText } from '@/components/ui/ui-text';
import { PortfolioItem } from './portfolio-item';

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
      data={portfolio}
      ListEmptyComponent={<UIText>No hay elementos en el Portfolio para mostrar.</UIText>}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRetry} />}
      keyExtractor={(portfolio, index) => `${portfolio.instrument_id}-${portfolio.ticker}-${index}`}
      renderItem={({ item: instrument }) => <PortfolioItem item={instrument} />}
    />
  );
}
