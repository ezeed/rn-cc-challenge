import client from '@/lib/api/api-client';
import { CreateOrderInput, CreateOrderResponse } from '../types';

export const createOrder = async (order: CreateOrderInput): Promise<CreateOrderResponse> => {
  const response = await client.post<CreateOrderResponse>('/orders', order);
  return response.data;
};
