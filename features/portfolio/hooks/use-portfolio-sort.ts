import { useMemo, useState } from 'react';
import { PortfolioProfit, PortfolioSortBy, PortfolioSortDirection } from '../types';

function sortPortfolio(
  portfolio: PortfolioProfit[],
  sortBy: PortfolioSortBy,
  direction: PortfolioSortDirection,
) {
  const data = [...portfolio];

  if (sortBy === 'ticker') {
    return data.sort((a, b) =>
      direction === 'asc' ? a.ticker.localeCompare(b.ticker) : b.ticker.localeCompare(a.ticker),
    );
  }

  if (sortBy === 'value') {
    return data.sort((a, b) =>
      direction === 'asc' ? a.total_value - b.total_value : b.total_value - a.total_value,
    );
  }

  return data.sort((a, b) =>
    direction === 'asc' ? a.total_return - b.total_return : b.total_return - a.total_return,
  );
}

export function usePortfolioSort(portfolio: PortfolioProfit[]) {
  const [sortBy, setSortBy] = useState<PortfolioSortBy | null>(null);
  const [sortDirection, setSortDirection] = useState<PortfolioSortDirection>('desc');

  const handleSortPress = (nextSortBy: PortfolioSortBy) => {
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

  const getSortArrow = (value: PortfolioSortBy) => {
    if (sortBy !== value) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const sortedPortfolio = useMemo(
    () => (sortBy ? sortPortfolio(portfolio, sortBy, sortDirection) : portfolio),
    [portfolio, sortBy, sortDirection],
  );

  return {
    sortBy,
    sortDirection,
    sortedPortfolio,
    handleSortPress,
    handleResetSort,
    getSortArrow,
  };
}
