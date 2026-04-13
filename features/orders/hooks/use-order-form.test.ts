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

  describe('handleTypeChange', () => {
    it('switches quantityMode to SHARES when changing to LIMIT while in AMOUNT mode', () => {
      const { result } = renderHook(() => useOrderForm());
      act(() => result.current.handleQuantityModeChange('AMOUNT'));
      act(() => result.current.handleTypeChange('LIMIT'));
      expect(result.current.form.quantityMode).toBe('SHARES');
      expect(result.current.form.type).toBe('LIMIT');
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
