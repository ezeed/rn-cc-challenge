import { UIAnimatedView } from '@/components/ui/ui-animated-view';
import { UIPressable } from '@/components/ui/ui-pressable';
import { UIText } from '@/components/ui/ui-text';
import { UIView } from '@/components/ui/ui-view';
import { useTheme } from '@/lib/theme/theme-provider';
import { StyleSheet } from 'react-native';
import { OrderSubmissionViewState } from '../types';
import { router } from 'expo-router';
import { UILoading } from '@/components/ui/ui-loading';

type Props = {
  submissionState: OrderSubmissionViewState;
  handleReset: () => void;
};

export function OrderResult({ submissionState, handleReset }: Props) {
  const { colors } = useTheme();
  return (
    <UIView style={styles.container}>
      <UIView
        style={[styles.card, { backgroundColor: colors.background, borderColor: colors.border }]}
      >
        {submissionState.kind === 'pending' && (
          <UIAnimatedView key="pending" preset="fadeDown" style={styles.cardContent}>
            <UILoading />
            <UIText variant="title">Enviando orden</UIText>
            <UIText color="muted">Estamos procesando tu orden.</UIText>
          </UIAnimatedView>
        )}
        {submissionState.kind === 'error' && (
          <UIAnimatedView key="error" preset="fadeDown" style={styles.cardContent}>
            <UIText variant="title">No se pudo enviar la orden</UIText>
            <UIText color="danger">{submissionState.message}</UIText>
          </UIAnimatedView>
        )}
        {submissionState.kind === 'success' && (
          <UIAnimatedView key="success" preset="fadeDown" style={styles.cardContent}>
            <UIText variant="title">Resultado de la orden</UIText>
            <UIText>{`Id de orden: ${submissionState.result.id}`}</UIText>
            <UIText
              variant="title"
              color={
                submissionState.result.status === 'REJECTED'
                  ? 'danger'
                  : submissionState.result.status === 'FILLED'
                    ? 'primary'
                    : 'secondary'
              }
            >{`Estado: ${submissionState.result.status}`}</UIText>
          </UIAnimatedView>
        )}
      </UIView>

      <UIView style={styles.row}>
        <UIPressable
          appearance="outline"
          onPress={() => router.back()}
          style={styles.flex}
          text="Salir"
        />
        <UIPressable
          disabled={submissionState.kind === 'pending'}
          onPress={handleReset}
          style={styles.flex}
          text="Volver a operar"
        />
      </UIView>
    </UIView>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  cardContent: {
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
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
});
