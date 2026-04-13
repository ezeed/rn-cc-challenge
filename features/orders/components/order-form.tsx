import { useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { UIAnimatedView } from '@/components/ui/ui-animated-view';
import { UIInput } from '@/components/ui/ui-input';
import { UIPressable } from '@/components/ui/ui-pressable';
import { UIText } from '@/components/ui/ui-text';
import { UIToggleGroup } from '@/components/ui/ui-toggle-group';
import { UIView } from '@/components/ui/ui-view';
import { useTheme } from '@/lib/theme/theme-provider';
import { formatPeso } from '@/lib/format-peso';
import { useOrderForm } from '../hooks/use-order-form';
import { useOrderSubmission } from '../hooks/use-order-submission';
import { OrderQuantityMode, OrderSide, OrderType } from '../types';
import { buildCreateOrderBody, calculateEstimatedShares } from '../utils/order-calculations';
import { isOrderFormValid, validateOrderForm } from '../utils/order-validation';
import { OrderResult } from './order-result';

type Props = {
  instrument: {
    id: number;
    ticker: string;
    name: string;
    price: string;
  };
};

const SIDE_OPTIONS: { label: string; value: OrderSide }[] = [
  { label: 'Compra', value: 'BUY' },
  { label: 'Venta', value: 'SELL' },
];

const TYPE_OPTIONS: { label: string; value: OrderType }[] = [
  { label: 'Market', value: 'MARKET' },
  { label: 'Limit', value: 'LIMIT' },
];

const QUANTITY_MODE_OPTIONS: { label: string; value: OrderQuantityMode }[] = [
  { label: 'Acciones', value: 'SHARES' },
  { label: 'Monto', value: 'AMOUNT' },
];

export function OrderForm({ instrument }: Props) {
  const { colors } = useTheme();
  const {
    form,
    handleSideChange,
    handleTypeChange,
    handleQuantityModeChange,
    handleSharesChange,
    handleAmountChange,
    handleLimitPriceChange,
    resetForm,
  } = useOrderForm();
  const { submissionState, submitOrder, isSubmitting, resetSubmission } = useOrderSubmission();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { side, type, quantityMode, shares, amount, limitPrice } = form;

  const handleReset = () => {
    resetForm();
    resetSubmission();
    setIsSubmitted(false);
  };

  if (submissionState) {
    return (
      <UIAnimatedView preset="fadeDown" style={styles.container}>
        <OrderResult submissionState={submissionState} handleReset={handleReset} />
      </UIAnimatedView>
    );
  }

  const price = Number(instrument.price);
  const estimatedShares = calculateEstimatedShares(Number(amount), price);
  const errors = validateOrderForm(form, price);
  const visibleErrors = isSubmitted ? errors : {};

  const handleSubmit = () => {
    if (!isOrderFormValid(errors)) {
      setIsSubmitted(true);
      return;
    }
    // ScrollView usa keyboardShouldPersistTaps="handled" y no triggerea el
    // auto-blur del input con foco. El dismiss de teclado es forzado para no tapar
    // la pantalla de resultado/pendiente al hacer submit.
    Keyboard.dismiss();
    const input = buildCreateOrderBody(form, instrument.id, estimatedShares);
    submitOrder(input);
  };

  const quantityModeOptions = QUANTITY_MODE_OPTIONS.map((opt) => ({
    ...opt,
    disabled: type === 'LIMIT' && opt.value === 'AMOUNT',
  }));

  return (
    <UIAnimatedView preset="fadeDown" style={styles.container}>
      <UIView style={styles.row}>
        <UIText>Operación</UIText>
        <UIToggleGroup compact options={SIDE_OPTIONS} value={side} onChange={handleSideChange} />
      </UIView>

      <UIView style={styles.row}>
        <UIText>Tipo de orden</UIText>
        <UIToggleGroup compact options={TYPE_OPTIONS} value={type} onChange={handleTypeChange} />
      </UIView>

      <UIView style={styles.row}>
        <UIText>Modo de cantidad</UIText>
        <UIToggleGroup
          compact
          options={quantityModeOptions}
          value={quantityMode}
          onChange={handleQuantityModeChange}
        />
      </UIView>

      {quantityMode === 'SHARES' && (
        <UIView style={styles.section}>
          <UIText>
            Cantidad de acciones
            <UIText color="muted"> (requerido)</UIText>
          </UIText>
          <UIInput
            keyboardType="numeric"
            onChangeText={handleSharesChange}
            placeholder="Ej. 10"
            value={shares}
            error={visibleErrors.shares}
          />
        </UIView>
      )}

      {quantityMode === 'AMOUNT' && (
        <UIView style={styles.section}>
          <UIText>
            Monto en ARS
            <UIText color="muted"> (requerido)</UIText>
          </UIText>
          <UIInput
            icon="dollar-sign"
            keyboardType="numeric"
            onChangeText={handleAmountChange}
            placeholder="Ej. 25000"
            value={amount}
            error={visibleErrors.amount}
          />
          {estimatedShares !== null && (
            <UIText color="muted">
              {estimatedShares > 0
                ? `${formatPeso(Number(amount))} te permite ${side === 'BUY' ? 'comprar' : 'vender'} hasta ${estimatedShares} acciones.`
                : 'El monto ingresado no alcanza para una accion entera.'}
            </UIText>
          )}
        </UIView>
      )}

      {type === 'LIMIT' && (
        <UIAnimatedView preset="fadeDown" style={styles.section}>
          <UIText>
            Precio limite en ARS <UIText color="muted">(requerido)</UIText>
          </UIText>
          <UIInput
            icon="dollar-sign"
            keyboardType="numeric"
            onChangeText={handleLimitPriceChange}
            placeholder="Ej. 84.5"
            value={limitPrice}
            error={visibleErrors.limitPrice}
          />
        </UIAnimatedView>
      )}

      <UIView style={styles.row}>
        <UIPressable
          appearance="outline"
          onPress={() => router.back()}
          style={styles.flex}
          text="Cancelar"
        />
        <UIPressable
          disabled={isSubmitting}
          loading={isSubmitting}
          onPress={handleSubmit}
          style={[
            styles.flex,
            { backgroundColor: side === 'BUY' ? colors.success : colors.danger },
          ]}
          text={side === 'BUY' ? 'Enviar compra' : 'Enviar venta'}
        />
      </UIView>
    </UIAnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingBottom: 24,
  },
  flex: {
    flex: 1,
    minWidth: 0,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  section: {
    gap: 8,
  },
});
