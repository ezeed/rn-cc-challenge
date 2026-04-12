import { CreateOrderInput, OrderFormValues, OrderType } from '../types';

export function calculateEstimatedShares(amount: number, price: number): number | null {
  if (!(amount > 0) || !(price > 0)) return null;
  return Math.floor(amount / price);
}

// Forzar al usuario a pasar cantidad de acciones para opera (SHARES) para tipo de operación LIMIT
// Para evitar el calculo de acciones basadas en 2 montos (monto total y precio límite)
// que pueden generar confusión o errores en la creación de la orden
// Ejemplo: Precio Limite $10 y Monto Total $25, el calculo de acciones sería 2.5, pero solo se pueden comprar 2 acciones completas
export function changeOrderType(form: OrderFormValues, nextType: OrderType): OrderFormValues {
  if (nextType === 'LIMIT' && form.quantityMode === 'AMOUNT') {
    return { ...form, type: nextType, quantityMode: 'SHARES' };
  }
  return { ...form, type: nextType };
}

export function buildCreateOrderBody(
  form: OrderFormValues,
  instrumentId: string,
  estimatedShares: number | null,
): CreateOrderInput {
  const quantity =
    form.quantityMode === 'SHARES' ? parseInt(form.shares, 10) : (estimatedShares ?? 0);

  return {
    instrument_id: parseInt(instrumentId, 10),
    side: form.side,
    type: form.type,
    quantity,
    ...(form.type === 'LIMIT' && { price: Number(form.limitPrice) }),
  };
}
