import { renderHook, act } from '@testing-library/react-native';
import { useOrderForm } from './use-order-form';

describe('useOrderForm', () => {
  describe('initial state', () => {
    it('starts with BUY side and MARKET type in SHARES mode', () => {
      const { result } = renderHook(() => useOrderForm());
      expect(result.current.form.side).toBe('BUY');
      expect(result.current.form.type).toBe('MARKET');
      expect(result.current.form.quantityMode).toBe('SHARES');
    });
  });

  describe('input handlers', () => {
    it('sanitizes decimal input for amount and limit price fields', () => {
      const { result } = renderHook(() => useOrderForm());
      act(() => result.current.handleAmountChange('12,5abc'));
      act(() => result.current.handleLimitPriceChange('84.5.3'));
      expect(result.current.form.amount).toBe('12.5');
      expect(result.current.form.limitPrice).toBe('84.53');
    });
  });

  describe('resetForm', () => {
    it('resets form back to initial state', () => {
      const { result } = renderHook(() => useOrderForm());
      act(() => result.current.handleSharesChange('10'));
      act(() => result.current.handleSideChange('SELL'));
      act(() => result.current.resetForm());
      expect(result.current.form.shares).toBe('');
      expect(result.current.form.side).toBe('BUY');
    });
  });
});
