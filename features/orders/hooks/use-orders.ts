import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../api';
import { CreateOrderInput } from '../types';

export function useOrders() {
  return useMutation({
    mutationFn: (order: CreateOrderInput) => createOrder(order),
  });
}
