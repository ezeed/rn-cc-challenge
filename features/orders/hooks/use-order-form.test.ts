import { renderHook, act } from '@testing-library/react-native';
import { useOrderForm } from './use-order-form';

jest.mock('@/lib/errors/api-errors', () => ({
  getErrorMessage: jest.fn().mockReturnValue('Error message'),
}));

jest.mock('./use-orders', () => ({
  useOrders: () => ({
    data: null,
    error: null,
    isPending: false,
    mutate: jest.fn(),
    reset: jest.fn(),
  }),
}));

describe('useOrderForm', () => {
  describe('initial state', () => {
    it('starts with BUY side and MARKET type', () => {
      const { result } = renderHook(() => useOrderForm({}));
      expect(result.current.form.side).toBe('BUY');
      expect(result.current.form.type).toBe('MARKET');
    });

    it('starts with submit disabled because shares is empty', () => {
      const { result } = renderHook(() => useOrderForm({}));
      expect(result.current.isSubmitDisabled).toBe(true);
    });
  });

  describe('shares mode', () => {
    it('enables submit when a valid number of shares is entered', () => {
      const { result } = renderHook(() => useOrderForm({}));
      act(() => result.current.handleSharesChange('10'));
      expect(result.current.isSubmitDisabled).toBe(false);
    });

    it('keeps submit disabled when shares is 0', () => {
      const { result } = renderHook(() => useOrderForm({}));
      act(() => result.current.handleSharesChange('0'));
      expect(result.current.isSubmitDisabled).toBe(true);
    });
  });

  describe('amount mode', () => {
    it('calculates estimatedShares from amount and instrument price', () => {
      const { result } = renderHook(() =>
        useOrderForm({ instrumentId: '1', lastPrice: '100' }),
      );
      act(() => result.current.handleQuantityModeChange('AMOUNT'));
      act(() => result.current.handleAmountChange('350'));
      expect(result.current.estimatedShares).toBe(3);
    });


  });

  describe('handleTypeChange', () => {
    it('switches quantityMode to SHARES when changing to LIMIT while in AMOUNT mode', () => {
      const { result } = renderHook(() => useOrderForm({}));
      act(() => result.current.handleQuantityModeChange('AMOUNT'));
      act(() => result.current.handleTypeChange('LIMIT'));
      expect(result.current.form.quantityMode).toBe('SHARES');
      expect(result.current.form.type).toBe('LIMIT');
    });

    it('does not change quantityMode when switching to LIMIT while already in SHARES mode', () => {
      const { result } = renderHook(() => useOrderForm({}));
      act(() => result.current.handleTypeChange('LIMIT'));
      expect(result.current.form.quantityMode).toBe('SHARES');
    });
  });

  describe('limit order', () => {
    it('keeps submit disabled when type is LIMIT and limitPrice is empty', () => {
      const { result } = renderHook(() => useOrderForm({}));
      act(() => result.current.handleSharesChange('5'));
      act(() => result.current.handleTypeChange('LIMIT'));
      expect(result.current.isSubmitDisabled).toBe(true);
    });

    it('enables submit when type is LIMIT and both shares and limitPrice are set', () => {
      const { result } = renderHook(() => useOrderForm({}));
      act(() => result.current.handleSharesChange('5'));
      act(() => result.current.handleTypeChange('LIMIT'));
      act(() => result.current.handleLimitPriceChange('200'));
      expect(result.current.isSubmitDisabled).toBe(false);
    });
  });

  describe('handleReset', () => {
    it('resets form back to initial state', () => {
      const { result } = renderHook(() => useOrderForm({}));
      act(() => result.current.handleSharesChange('10'));
      act(() => result.current.handleSideChange('SELL'));
      act(() => result.current.handleReset());
      expect(result.current.form.shares).toBe('');
      expect(result.current.form.side).toBe('BUY');
    });
  });
});
