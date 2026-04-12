import { useState } from 'react';
import { sanitizeDecimalInput, sanitizeIntegerInput } from '@/lib/sanitize-numeric-input';
import {
  OrderFormValues,
  OrderQuantityMode,
  OrderSide,
  OrderType,
} from '../types';
import { changeOrderType } from '../utils/order-calculations';

const INITIAL_FORM: OrderFormValues = {
  side: 'BUY',
  type: 'MARKET',
  quantityMode: 'SHARES',
  shares: '',
  amount: '',
  limitPrice: '',
};

export function useOrderForm() {
  const [form, setForm] = useState<OrderFormValues>(INITIAL_FORM);

  const set = (next: Partial<OrderFormValues>) =>
    setForm((prev) => ({ ...prev, ...next }));

  return {
    form,
    handleSideChange: (side: OrderSide) => set({ side }),
    handleTypeChange: (type: OrderType) => setForm((prev) => changeOrderType(prev, type)),
    handleQuantityModeChange: (quantityMode: OrderQuantityMode) => set({ quantityMode }),
    handleSharesChange: (shares: string) => set({ shares: sanitizeIntegerInput(shares) }),
    handleAmountChange: (amount: string) => set({ amount: sanitizeDecimalInput(amount) }),
    handleLimitPriceChange: (limitPrice: string) =>
      set({ limitPrice: sanitizeDecimalInput(limitPrice) }),
    resetForm: () => setForm(INITIAL_FORM),
  };
}
