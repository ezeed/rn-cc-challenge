export type PortfolioSortBy = 'ticker' | 'value' | 'total_return';
export type PortfolioSortDirection = 'asc' | 'desc';

export type Portfolio = {
  instrument_id: number;
  ticker: string;
  quantity: number;
  last_price: number;
  close_price: number;
  avg_cost_price: number;
};

export type PortfolioProfit = Portfolio & {
  total_value: number;
  gain: number;
  total_return: number;
};
