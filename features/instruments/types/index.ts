export enum InstrumentType {
  ACCIONES = 'ACCIONES',
  MONEDA = 'MONEDA',
}

export type InstrumentSortBy = 'ticker' | 'price' | 'profit';
export type InstrumentSortDirection = 'asc' | 'desc';

export type Instrument = {
  id: number;
  ticker: string;
  name: string;
  type: InstrumentType;
  last_price: number;
  close_price: number;
};

export type InstrumentProfit = Instrument & {
  profit: number;
};
