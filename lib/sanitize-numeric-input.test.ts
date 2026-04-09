import { sanitizeIntegerInput, sanitizeDecimalInput } from './sanitize-numeric-input';

describe('sanitizeIntegerInput', () => {
  it('removes all non-digit characters', () => {
    expect(sanitizeIntegerInput('12abc34')).toBe('1234');
  });

  it('removes dots and commas', () => {
    expect(sanitizeIntegerInput('1.000,00')).toBe('100000');
  });

  it('returns empty string when input has no digits', () => {
    expect(sanitizeIntegerInput('abc')).toBe('');
  });

  it('returns the same string when input is already a valid integer', () => {
    expect(sanitizeIntegerInput('42')).toBe('42');
  });

  it('returns empty string for empty input', () => {
    expect(sanitizeIntegerInput('')).toBe('');
  });
});

describe('sanitizeDecimalInput', () => {
  it('normalizes comma to dot as decimal separator', () => {
    expect(sanitizeDecimalInput('1,5')).toBe('1.5');
  });

  it('removes letters and special characters', () => {
    expect(sanitizeDecimalInput('12abc.5')).toBe('12.5');
  });

  it('collapses multiple dots into a single decimal separator', () => {
    expect(sanitizeDecimalInput('1.5.3')).toBe('1.53');
  });

  it('returns empty string for empty input', () => {
    expect(sanitizeDecimalInput('')).toBe('');
  });

  it('returns only digits when there is no decimal separator', () => {
    expect(sanitizeDecimalInput('100')).toBe('100');
  });

  it('preserves trailing zeros in decimal part', () => {
    expect(sanitizeDecimalInput('10.50')).toBe('10.50');
  });
});
