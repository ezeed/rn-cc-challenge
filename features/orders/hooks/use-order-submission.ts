import { getErrorMessage } from '@/lib/errors/api-errors';
import { CreateOrderInput, OrderSubmissionViewState } from '../types';
import { useOrders } from './use-orders';

export function useOrderSubmission() {
  const { data, error, isPending, mutate, reset } = useOrders();

  const submissionState: OrderSubmissionViewState | null = isPending
    ? { kind: 'pending' }
    : data
      ? { kind: 'success', result: data }
      : error
        ? { kind: 'error', message: getErrorMessage(error) }
        : null;

  const submitOrder = (input: CreateOrderInput) => {
    mutate(input);
  };

  return {
    submissionState,
    submitOrder,
    isSubmitting: isPending,
    resetSubmission: reset,
  };
}
