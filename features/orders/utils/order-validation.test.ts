import { OrderFormValues } from '../types';
import { isOrderFormValid, validateOrderForm } from './order-validation';

const baseForm: OrderFormValues = {
  side: 'BUY',
  type: 'MARKET',
  quantityMode: 'SHARES',
  shares: '',
  amount: '',
  limitPrice: '',
};

const price = 100;

describe('validateOrderForm', () => {
  it('returns shares error when shares is empty or zero', () => {
    expect(validateOrderForm(baseForm, price).shares).toBeDefined();
    expect(validateOrderForm({ ...baseForm, shares: '0' }, price).shares).toBeDefined();
  });

  it('passes when shares is valid', () => {
    const errors = validateOrderForm({ ...baseForm, shares: '10' }, price);
    expect(isOrderFormValid(errors)).toBe(true);
  });

  it('returns amount error when amount is empty in AMOUNT mode', () => {
    const errors = validateOrderForm({ ...baseForm, quantityMode: 'AMOUNT' }, price);
    expect(errors.amount).toBeDefined();
  });

  it('returns amount error when amount does not reach one share', () => {
    const errors = validateOrderForm(
      { ...baseForm, quantityMode: 'AMOUNT', amount: '50' },
      price,
    );
    expect(errors.amount).toBeDefined();
  });

  it('passes when amount covers at least one share', () => {
    const errors = validateOrderForm(
      { ...baseForm, quantityMode: 'AMOUNT', amount: '150' },
      price,
    );
    expect(isOrderFormValid(errors)).toBe(true);
  });

  it('returns limitPrice error when type is LIMIT and limitPrice is missing', () => {
    const errors = validateOrderForm(
      { ...baseForm, type: 'LIMIT', shares: '5' },
      price,
    );
    expect(errors.limitPrice).toBeDefined();
  });

  it('passes when LIMIT order has valid shares and limitPrice', () => {
    const errors = validateOrderForm(
      { ...baseForm, type: 'LIMIT', shares: '5', limitPrice: '84.5' },
      price,
    );
    expect(isOrderFormValid(errors)).toBe(true);
  });
});
