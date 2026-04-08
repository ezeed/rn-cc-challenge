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
        {/* TODO: Implementar sort */}
        {/* <UIView style={styles.sortRow}>
          <UIPressable
            size="sm"
            appearance="outline"
            active={sortBy === 'ticker'}
            onPress={() => handleSortPress('ticker')}
          >
            <ChipLabel
              label="Ticker"
              value="ticker"
              sortBy={sortBy}
              arrow={getSortArrow('ticker') ?? ''}
            />
          </UIPressable>
          <UIPressable
            size="sm"
            appearance="outline"
            active={sortBy === 'price'}
            onPress={() => handleSortPress('price')}
          >
            <ChipLabel
              label="Precio"
              value="price"
              sortBy={sortBy}
              arrow={getSortArrow('price') ?? ''}
            />
          </UIPressable>
          <UIPressable
            size="sm"
            appearance="outline"
            active={sortBy === 'profit'}
            onPress={() => handleSortPress('profit')}
          >
            <ChipLabel
              label="Retorno"
              value="profit"
              sortBy={sortBy}
              arrow={getSortArrow('profit') ?? ''}
            />
          </UIPressable>
          <UIPressable
            disabled={sortBy === null}
            size="sm"
            appearance="outline"
            text="Reset"
            onPress={handleResetSort}
          />
        </UIView> */}
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
