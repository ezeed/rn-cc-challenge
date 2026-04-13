import { formatPeso } from './format-peso';

describe('formatPeso', () => {
  it('formats a positive amount using ARS locale conventions', () => {
    const formatted = formatPeso(1000.5);
    expect(formatted).toContain('$');
    expect(formatted).toContain('1.000');
    expect(formatted).toContain('0,50');
  });

  it('formats negative amounts with minus sign', () => {
    expect(formatPeso(-1000)).toMatch(/-/);
  });
});
