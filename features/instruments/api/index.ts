import client from '@/lib/api/api-client';
import { Instrument } from '../types';

export const getInstruments = async (): Promise<Instrument[]> => {
  return client.get<Instrument[]>('/instruments').then((res) => res.data);
};

export const getInstrumentsByTicker = async (ticker: string): Promise<Instrument[]> => {
  return client.get<Instrument[]>('/search', { params: { query: ticker } }).then((res) => res.data);
};
