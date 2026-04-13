export const ORDER_SIDES = ['BUY', 'SELL'] as const;
export type OrderSide = (typeof ORDER_SIDES)[number];

export const ORDER_TYPES = ['MARKET', 'LIMIT'] as const;
export type OrderType = (typeof ORDER_TYPES)[number];

export const ORDER_STATUSES = ['PENDING', 'REJECTED', 'FILLED'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_QUANTITY_MODES = ['SHARES', 'AMOUNT'] as const;
export type OrderQuantityMode = (typeof ORDER_QUANTITY_MODES)[number];

export type OrderFormValues = {
  side: OrderSide;
  type: OrderType;
  quantityMode: OrderQuantityMode;
  shares: string;
  amount: string;
  limitPrice: string;
};

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
