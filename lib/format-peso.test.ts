import { formatPeso } from './format-peso';

describe('formatPeso', () => {
  it('includes the ARS currency symbol', () => {
    expect(formatPeso(100)).toContain('$');
  });

  it('formats thousands with dot separator (es-AR locale)', () => {
    expect(formatPeso(1000)).toContain('1.000');
  });

  it('formats decimals with comma separator (es-AR locale)', () => {
    expect(formatPeso(1.5)).toContain('1,50');
  });

  it('formats zero', () => {
    expect(formatPeso(0)).toContain('0,00');
  });

  it('formats negative amounts with minus sign', () => {
    expect(formatPeso(-1000)).toMatch(/-/);
  });

  it('formats large numbers with multiple thousand separators', () => {
    expect(formatPeso(1000000)).toContain('1.000.000');
  });
});
