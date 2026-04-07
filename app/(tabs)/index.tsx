import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { useInstruments, InstrumentsList, useInstrumentSort } from '@/features/instruments';
import { UISafeArea } from '@/components/ui/ui-safe-area';
import { UIInput } from '@/components/ui/ui-input';
import { UIView } from '@/components/ui/ui-view';
import { UIPressable } from '@/components/ui/ui-pressable';
import { ChipLabel } from '@/features/instruments/components/chip-label';

export default function InstrumentsScreen() {
  const [search, setSearch] = useState('');
  const { data: instruments, isLoading, error, refetch } = useInstruments(search);
  const { sortBy, sortedInstruments, handleSortPress, handleResetSort, getSortArrow } =
    useInstrumentSort(instruments ?? []);

  const handleSearch = (text: string) => {
    setSearch(text.toUpperCase());
  };

  return (
    <UISafeArea>
      <UIView style={styles.container}>
        <UIInput
          placeholder="Buscar Instrumentos"
          icon="search"
          value={search}
          clearable
          onChangeText={handleSearch}
        />
        <UIView style={styles.sortRow}>
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
        </UIView>
        <InstrumentsList
          instruments={sortedInstruments ?? []}
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
    padding: 16,
  },
  sortRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
