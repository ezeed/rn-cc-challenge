import { StyleSheet } from 'react-native';
import { usePortfolio, PortfolioList } from '@/features/portfolio';
import { UISafeArea } from '@/components/ui/ui-safe-area';
import { UIView } from '@/components/ui/ui-view';
import { useMemo, useState } from 'react';
import { UIInput } from '@/components/ui/ui-input';

export default function PortfolioScreen() {
  const { data: portfolio, isLoading, error, refetch } = usePortfolio();
  const [search, setSearch] = useState('');

  const filteredPortfolio = useMemo(() => {
    const query = search.trim().toUpperCase();

    if (!query) return portfolio ?? [];

    return (portfolio ?? []).filter((item) => item.ticker.includes(query));
  }, [portfolio, search]);

  const handleSearch = (text: string) => {
    setSearch(text.toUpperCase());
  };

  return (
    <UISafeArea>
      <UIView style={styles.container}>
        <UIView style={styles.searchRow}>
          <UIInput
            placeholder="Buscar Instrumentos"
            icon="search"
            value={search}
            clearable
            onChangeText={handleSearch}
          />
        </UIView>
        <PortfolioList
          portfolio={filteredPortfolio ?? []}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
        />
      </UIView>
    </UISafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingVertical: 16,
  },
  searchRow: {
    paddingHorizontal: 16,
    gap: 20,
  },
  sortRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
