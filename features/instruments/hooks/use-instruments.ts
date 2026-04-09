import { useQuery } from '@tanstack/react-query';
import { getInstruments, getInstrumentsByTicker } from '../api';
import { Instrument, InstrumentProfit, InstrumentType } from '../types';
import { getProfit } from '@/lib/get-profit';

function withProfit(accum: InstrumentProfit[], instrument: Instrument): InstrumentProfit[] {
  if (instrument.type === InstrumentType.ACCIONES) {
    const profit = getProfit(instrument.last_price, instrument.close_price);
    accum.push({
      ...instrument,
      profit,
    });
  }
  return accum;
}

export function useInstruments(ticker: string) {
  return useQuery({
    queryKey: ['instruments', ticker],
    queryFn: () => (ticker ? getInstrumentsByTicker(ticker.toUpperCase()) : getInstruments()),
    select: (instruments) => instruments.reduce(withProfit, [] as InstrumentProfit[]),
  });
}
