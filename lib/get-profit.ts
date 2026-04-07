export function getProfit(lastPrice: number, closePrice: number) {
  return closePrice === 0 ? 0 : ((lastPrice - closePrice) / closePrice) * 100;
}
