export type OrderSide = 'BUY' | 'SELL';
export type OrderType = 'MARKET' | 'LIMIT';
export type OrderStatus = 'PENDING' | 'REJECTED' | 'FILLED';
export type OrderQuantityMode = 'SHARES' | 'AMOUNT';

export type CreateOrderInput = {
  instrument_id: number;
  side: OrderSide;
  type: OrderType;
  quantity: number;
  price?: number;
};

export type CreateOrderResponse = {
  id: number;
  status: OrderStatus;
};

export type OrderSubmissionViewState =
  | { kind: 'pending' }
  | { kind: 'success'; result: { id: number; status: string } }
  | { kind: 'error'; message: string };
