export type Portfolio = {
  instrument_id: number;
  ticker: string;
  quantity: number;
  last_price: number;
  close_price: number;
  avg_cost_price: number;
};

export type PortfolioProfit = Portfolio & {
  profit: number;
  total_return: number;
  total_value: number;
};
