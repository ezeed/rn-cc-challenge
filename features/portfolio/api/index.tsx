import client from '@/lib/api/api-client';
import { Portfolio } from '../types';

export const getPortfolio = async (): Promise<Portfolio[]> => {
  return client.get<Portfolio[]>('/portfolio').then((res) => res.data);
};
