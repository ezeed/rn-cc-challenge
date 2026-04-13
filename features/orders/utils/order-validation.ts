import { OrderFormValues } from '../types';
import { calculateEstimatedShares } from './order-calculations';

export type OrderFormErrors = {
  shares?: string;
  amount?: string;
  limitPrice?: string;
};

const ERROR_MESSAGES = {
  VALID_SHARES: 'Ingresa una cantidad de acciones válida.',
  VALID_AMOUNT: 'Ingresa un monto válido.',
  AMOUNT_TOO_LOW: 'El monto no alcanza para una acción entera.',
  VALID_LIMIT_PRICE: 'Ingresa un precio límite válido.',
};

export function validateOrderForm(form: OrderFormValues, price: number): OrderFormErrors {
  const errors: OrderFormErrors = {};

  if (form.quantityMode === 'SHARES') {
    const shares = Number(form.shares);
    if (!shares || shares <= 0) {
      errors.shares = ERROR_MESSAGES.VALID_SHARES;
    }
  } else {
    const amount = Number(form.amount);
    if (!amount || amount <= 0) {
      errors.amount = ERROR_MESSAGES.VALID_AMOUNT;
    } else if ((calculateEstimatedShares(amount, price) ?? 0) < 1) {
      errors.amount = ERROR_MESSAGES.AMOUNT_TOO_LOW;
    }
  }

  if (form.type === 'LIMIT') {
    const limitPrice = Number(form.limitPrice);
    if (!limitPrice || limitPrice <= 0) {
      errors.limitPrice = ERROR_MESSAGES.VALID_LIMIT_PRICE;
    }
  }

  return errors;
}

export function isOrderFormValid(errors: OrderFormErrors): boolean {
  return Object.keys(errors).length === 0;
}
