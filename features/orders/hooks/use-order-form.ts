import { useState } from 'react';
import { Keyboard } from 'react-native';
import { getErrorMessage } from '@/lib/errors/api-errors';
import { useOrders } from './use-orders';
import { sanitizeDecimalInput, sanitizeIntegerInput } from '@/lib/sanitize-numeric-input';
import { OrderQuantityMode, OrderSide, OrderSubmissionViewState, OrderType } from '../types';

type FormState = {
  side: OrderSide;
  type: OrderType;
  quantityMode: OrderQuantityMode;
  shares: string;
  amount: string;
  limitPrice: string;
};

const INITIAL_FORM: FormState = {
  side: 'BUY',
  type: 'MARKET',
  quantityMode: 'SHARES',
  shares: '',
  amount: '',
  limitPrice: '',
};

type Params = {
  instrumentId?: string;
  lastPrice?: string;
};

export function useOrderForm({ instrumentId, lastPrice }: Params) {
  const { data, error, isPending, mutate, reset } = useOrders();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  const set = (patch: Partial<FormState>) => setForm((prev) => ({ ...prev, ...patch }));

  const instrumentPrice = Number(lastPrice ?? '');
  const parsedShares = parseInt(form.shares, 10);
  const parsedAmount = Number(form.amount);
  const estimatedShares =
    form.quantityMode === 'AMOUNT' && parsedAmount > 0 && instrumentPrice > 0
      ? Math.floor(parsedAmount / instrumentPrice)
      : null;

  const isSubmitDisabled =
    isPending ||
    (form.quantityMode === 'SHARES' && (isNaN(parsedShares) || parsedShares <= 0)) ||
    (form.quantityMode === 'AMOUNT' && (estimatedShares === null || estimatedShares < 1)) ||
    (form.type === 'LIMIT' && !Number(form.limitPrice));

  const submissionState: OrderSubmissionViewState | null = isPending
    ? { kind: 'pending' }
    : data
      ? { kind: 'success', result: data }
      : error
        ? { kind: 'error', message: getErrorMessage(error) }
        : null;

  const handleTypeChange = (type: OrderType) => {
    if (type === 'LIMIT' && form.quantityMode === 'AMOUNT') {
      set({ type, quantityMode: 'SHARES' });
    } else {
      set({ type });
    }
  };

  const handleSubmit = () => {
    const id = parseInt(instrumentId ?? '', 10);
    const quantity = form.quantityMode === 'SHARES' ? parsedShares : estimatedShares;
    if (!id || !quantity) return;

    Keyboard.dismiss();
    mutate({
      instrument_id: id,
      side: form.side,
      type: form.type,
      quantity,
      ...(form.type === 'LIMIT' && { price: Number(form.limitPrice) }),
    });
  };

  return {
    form,
    estimatedShares,
    isSubmitDisabled,
    isSubmitting: isPending,
    submissionState,
    handleTypeChange,
    handleSideChange: (side: OrderSide) => set({ side }),
    handleQuantityModeChange: (quantityMode: OrderQuantityMode) => set({ quantityMode }),
    handleSharesChange: (shares: string) => set({ shares: sanitizeIntegerInput(shares) }),
    handleAmountChange: (amount: string) => set({ amount: sanitizeDecimalInput(amount) }),
    handleLimitPriceChange: (limitPrice: string) =>
      set({ limitPrice: sanitizeDecimalInput(limitPrice) }),
    handleSubmit,
    handleReset: () => {
      setForm(INITIAL_FORM);
      reset();
    },
  };
}
