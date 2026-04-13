import { useQuery } from '@tanstack/react-query';
import { getPortfolio } from '../api';
import { Portfolio, PortfolioProfit } from '../types';
import { getProfit } from '@/lib/get-profit';

function withProfit(portfolio: Portfolio): PortfolioProfit {
  const totalReturn = getProfit(portfolio.last_price, portfolio.avg_cost_price);
  const totalValue = portfolio.quantity * portfolio.last_price;
  const totalCost = portfolio.quantity * portfolio.avg_cost_price;
  const gain = totalValue - totalCost;
  return {
    ...portfolio,
    total_value: totalValue,
    gain,
    total_return: totalReturn,
  };
}

export function usePortfolio() {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: getPortfolio,
    select: (portfolio) =>
      // ARS es excluido ya que, deacuerdo al endpoint de instruentos, ARS no es del type "ACCIONES"
      portfolio.filter((portfolio) => portfolio.ticker !== 'ARS').map(withProfit),
  });
}
