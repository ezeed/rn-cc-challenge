import { StyleSheet } from 'react-native';
import { useMemo, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { usePortfolio, usePortfolioSort, PortfolioList } from '@/features/portfolio';
import { UIAnimatedView } from '@/components/ui/ui-animated-view';
import { UISafeArea } from '@/components/ui/ui-safe-area';
import { UIView } from '@/components/ui/ui-view';
import { UIInput } from '@/components/ui/ui-input';
import { UIPressable } from '@/components/ui/ui-pressable';
import { UIChipLabel } from '@/components/ui/ui-chip-label';
import { useTheme } from '@/lib/theme/theme-provider';

export default function PortfolioScreen() {
  const { colors } = useTheme();
  const { data: portfolio, isLoading, error, refetch } = usePortfolio();
  const [search, setSearch] = useState('');

  const filteredPortfolio = useMemo(() => {
    const query = search.trim().toUpperCase();

    if (!query) return portfolio ?? [];

    return (portfolio ?? []).filter((item) => item.ticker.includes(query));
  }, [portfolio, search]);

  const { sortBy, sortedPortfolio, handleSortPress, handleResetSort, getSortArrow } =
    usePortfolioSort(filteredPortfolio);

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <UISafeArea>
      <UIAnimatedView preset="fadeDown" style={styles.container}>
        <UIView style={styles.searchRow}>
          <UIInput
            placeholder="Buscar Instrumentos"
            icon="search"
            value={search}
            clearable
            autoCapitalize="characters"
            autoCorrect={false}
            onChangeText={handleSearch}
          />

          <UIView style={styles.sortRow}>
            <UIPressable
              size="sm"
              appearance="outline"
              active={sortBy === 'ticker'}
              onPress={() => handleSortPress('ticker')}
              accessibilityLabel="Ordenar por ticker"
            >
              <UIChipLabel
                label="Ticker"
                value="ticker"
                sortBy={sortBy}
                arrow={getSortArrow('ticker') ?? ''}
              />
            </UIPressable>
            <UIPressable
              size="sm"
              appearance="outline"
              active={sortBy === 'value'}
              onPress={() => handleSortPress('value')}
              accessibilityLabel="Ordenar por valor"
            >
              <UIChipLabel
                label="Valor"
                value="value"
                sortBy={sortBy}
                arrow={getSortArrow('value') ?? ''}
              />
            </UIPressable>
            <UIPressable
              size="sm"
              appearance="outline"
              active={sortBy === 'total_return'}
              onPress={() => handleSortPress('total_return')}
              accessibilityLabel="Ordenar por rendimiento total"
            >
              <UIChipLabel
                label="Rendimiento"
                value="total_return"
                sortBy={sortBy}
                arrow={getSortArrow('total_return') ?? ''}
              />
            </UIPressable>
            <UIPressable
              disabled={sortBy === null}
              size="sm"
              appearance="outline"
              onPress={handleResetSort}
              accessibilityLabel="Quitar ordenamiento"
            >
              <Feather name="x" size={18} color={colors.text} />
            </UIPressable>
          </UIView>
        </UIView>
        <PortfolioList
          portfolio={sortedPortfolio}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
        />
      </UIAnimatedView>
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
    justifyContent: 'space-between',
    gap: 6,
  },
});
