import { StyleSheet } from 'react-native';
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
import { OrderQuantityMode, OrderSide, OrderType } from '../types';
import { OrderResult } from './order-result';

type Props = {
  instrument: {
    id?: string;
    ticker?: string;
    name?: string;
    price?: string;
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

export function OrderFlow({ instrument }: Props) {
  const { colors } = useTheme();
  const {
    form,
    estimatedShares,
    isSubmitDisabled,
    isSubmitting,
    submissionState,
    handleSideChange,
    handleTypeChange,
    handleQuantityModeChange,
    handleSharesChange,
    handleAmountChange,
    handleLimitPriceChange,
    handleSubmit,
    handleReset,
  } = useOrderForm({ instrumentId: instrument.id, lastPrice: instrument.price });

  const { side, type, quantityMode, shares, amount, limitPrice } = form;

  if (submissionState) {
    return (
      <UIAnimatedView preset="fadeDown" style={styles.container}>
        <OrderResult submissionState={submissionState} handleReset={handleReset} />
      </UIAnimatedView>
    );
  }

  const quantityModeOptions = QUANTITY_MODE_OPTIONS.map((opt) => ({
    ...opt,
    disabled: type === 'LIMIT' && opt.value === 'AMOUNT',
  }));

  const parsedAmount = Number(amount);

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

      <UIView style={styles.section}>
        <UIText>
          {quantityMode === 'SHARES' ? 'Cantidad de acciones' : 'Monto en ARS'}
          <UIText color="muted"> (requerido)</UIText>
        </UIText>
        <UIInput
          keyboardType="numeric"
          icon={quantityMode === 'AMOUNT' ? 'dollar-sign' : undefined}
          onChangeText={quantityMode === 'SHARES' ? handleSharesChange : handleAmountChange}
          placeholder={quantityMode === 'SHARES' ? 'Ej. 10' : 'Ej. 25000'}
          value={quantityMode === 'SHARES' ? shares : amount}
        />
        {quantityMode === 'AMOUNT' && estimatedShares !== null && (
          <UIText color="muted">
            {estimatedShares > 0
              ? `${formatPeso(parsedAmount)} te permite ${side === 'BUY' ? 'comprar' : 'vender'} hasta ${estimatedShares} acciones.`
              : 'El monto ingresado no alcanza para una accion entera.'}
          </UIText>
        )}
      </UIView>

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
          disabled={isSubmitDisabled}
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
