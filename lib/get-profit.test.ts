import { getProfit } from './get-profit';

describe('getProfit', () => {
  it('returns 0 when closePrice is 0 to avoid division by zero', () => {
    expect(getProfit(100, 0)).toBe(0);
  });

  it('returns 0 when price has not changed', () => {
    expect(getProfit(100, 100)).toBe(0);
  });

  it('returns positive percentage on price gain', () => {
    expect(getProfit(110, 100)).toBe(10);
  });

  it('returns negative percentage on price loss', () => {
    expect(getProfit(90, 100)).toBe(-10);
  });

  it('returns 100% loss when lastPrice is 0', () => {
    expect(getProfit(0, 100)).toBe(-100);
  });

  it('handles fractional percentages', () => {
    expect(getProfit(101.5, 100)).toBeCloseTo(1.5);
  });
});
