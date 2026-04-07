import { useMemo, useState } from 'react';
import { InstrumentProfit, InstrumentSortBy, InstrumentSortDirection } from '../types';

function sortInstruments(
  instruments: InstrumentProfit[],
  sortBy: InstrumentSortBy,
  direction: InstrumentSortDirection,
) {
  const data = [...instruments];

  if (sortBy === 'ticker') {
    return data.sort((a, b) =>
      direction === 'asc' ? a.ticker.localeCompare(b.ticker) : b.ticker.localeCompare(a.ticker),
    );
  }

  if (sortBy === 'price') {
    return data.sort((a, b) =>
      direction === 'asc' ? a.last_price - b.last_price : b.last_price - a.last_price,
    );
  }

  return data.sort((a, b) => (direction === 'asc' ? a.profit - b.profit : b.profit - a.profit));
}

export function useInstrumentSort(instruments: InstrumentProfit[]) {
  const [sortBy, setSortBy] = useState<InstrumentSortBy | null>(null);
  const [sortDirection, setSortDirection] = useState<InstrumentSortDirection>('desc');

  const handleSortPress = (nextSortBy: InstrumentSortBy) => {
    if (sortBy === nextSortBy) {
      setSortDirection((currentDirection) => (currentDirection === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortBy(nextSortBy);
    setSortDirection(nextSortBy === 'ticker' ? 'asc' : 'desc');
  };

  const handleResetSort = () => {
    setSortBy(null);
    setSortDirection('desc');
  };

  const getSortArrow = (value: InstrumentSortBy) => {
    if (sortBy !== value) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const sortedInstruments = useMemo(
    () => (sortBy ? sortInstruments(instruments, sortBy, sortDirection) : instruments),
    [instruments, sortBy, sortDirection],
  );

  return {
    sortBy,
    sortDirection,
    sortedInstruments,
    handleSortPress,
    handleResetSort,
    getSortArrow,
  };
}
