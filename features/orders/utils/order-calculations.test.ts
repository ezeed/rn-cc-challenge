import { OrderFormValues } from '../types';
import {
  changeOrderType,
  buildCreateOrderBody,
  calculateEstimatedShares,
} from './order-calculations';

const baseForm: OrderFormValues = {
  side: 'BUY',
  type: 'MARKET',
  quantityMode: 'SHARES',
  shares: '',
  amount: '',
  limitPrice: '',
};

describe('calculateEstimatedShares', () => {
  it('returns floor(amount / price) when both are positive', () => {
    expect(calculateEstimatedShares(350, 100)).toBe(3);
  });

  it('returns null when amount is zero or negative', () => {
    expect(calculateEstimatedShares(0, 100)).toBeNull();
    expect(calculateEstimatedShares(-10, 100)).toBeNull();
  });

  it('returns null when price is zero or negative', () => {
    expect(calculateEstimatedShares(100, 0)).toBeNull();
  });
});

describe('changeOrderType', () => {
  it('switches quantityMode to SHARES when changing to LIMIT while in AMOUNT mode', () => {
    const form: OrderFormValues = { ...baseForm, quantityMode: 'AMOUNT' };
    expect(changeOrderType(form, 'LIMIT')).toMatchObject({
      type: 'LIMIT',
      quantityMode: 'SHARES',
    });
  });

  it('keeps quantityMode when changing to LIMIT while already in SHARES mode', () => {
    expect(changeOrderType(baseForm, 'LIMIT').quantityMode).toBe('SHARES');
  });

  it('keeps quantityMode when changing to MARKET', () => {
    const form: OrderFormValues = { ...baseForm, quantityMode: 'AMOUNT' };
    expect(changeOrderType(form, 'MARKET').quantityMode).toBe('AMOUNT');
  });
});

describe('buildCreateOrderBody', () => {
  it('builds a MARKET shares order', () => {
    const form: OrderFormValues = { ...baseForm, shares: '10' };
    expect(buildCreateOrderBody(form, 1,null)).toEqual({
      instrument_id: 1,
      side: 'BUY',
      type: 'MARKET',
      quantity: 10,
    });
  });

  it('builds a LIMIT order with price', () => {
    const form: OrderFormValues = {
      ...baseForm,
      type: 'LIMIT',
      shares: '5',
      limitPrice: '84.5',
    };
    expect(buildCreateOrderBody(form, 1,null)).toEqual({
      instrument_id: 1,
      side: 'BUY',
      type: 'LIMIT',
      quantity: 5,
      price: 84.5,
    });
  });

  it('uses estimatedShares as quantity in AMOUNT mode', () => {
    const form: OrderFormValues = { ...baseForm, quantityMode: 'AMOUNT', amount: '350' };
    expect(buildCreateOrderBody(form, 1,3).quantity).toBe(3);
  });
});
