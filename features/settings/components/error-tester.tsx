import { StyleSheet } from 'react-native';
import { UIPressable } from '@/components/ui/ui-pressable';
import { UIText } from '@/components/ui/ui-text';
import { UIView } from '@/components/ui/ui-view';
import { getErrorMessage } from '@/lib/errors/api-errors';
import { monitoring } from '@/lib/monitoring/monitoring';
import { useTheme } from '@/lib/theme/theme-provider';
import { useState } from 'react';
import { useHTTPStatus } from '../hooks/use-http-status';

type ResultState = {
  title: string;
  message: string;
};

function ErrorTester() {
  const { colors } = useTheme();
  const [result, setResult] = useState<ResultState | null>(null);
  const [shouldCrash, setShouldCrash] = useState(false);
  const { isPending, mutate } = useHTTPStatus();

  if (shouldCrash) {
    throw new Error('Dev ErrorBoundary test');
  }

  const handleError = (title: string, error: unknown) => {
    console.log(`[dev-errors] ${title}`, error);
    monitoring.captureException(error, { source: 'dev-errors', title });
    setResult({
      title,
      message: getErrorMessage(error),
    });
  };

  const handleErrorTrigger = (status: string) => {
    setResult(null);
    mutate(status, {
      onError: (error) => {
        handleError(status, error);
      },
    });
  };

  return (
    <UIView style={styles.container}>
      <UIText style={styles.sectionTitle}>Pruebas de errores</UIText>
      <UIText color="muted">Botones para validar mensajes de error.</UIText>

      <UIView style={styles.actionsGrid}>
        <UIPressable
          style={styles.gridButton}
          text="404"
          loading={isPending}
          onPressIn={() => handleErrorTrigger('404')}
        />

        <UIPressable
          style={styles.gridButton}
          text="500"
          loading={isPending}
          onPressIn={() => handleErrorTrigger('500')}
        />

        <UIPressable
          style={styles.gridButton}
          text="401-Auth"
          loading={isPending}
          onPressIn={() => handleErrorTrigger('401')}
        />

        <UIPressable
          style={styles.gridButton}
          text="error manual"
          onPress={() => handleError('manual', new Error('Dev manual error'))}
        />
      </UIView>

      <UIView style={styles.actionsFooter}>
        <UIPressable
          variant="danger"
          style={styles.footerButton}
          text="ErrorBoundary"
          onPress={() => {
            setResult(null);
            setShouldCrash(true);
          }}
        />
      </UIView>

      {result ? (
        <UIView
          background="surface"
          style={[
            styles.resultCard,
            {
              borderColor: colors.border,
            },
          ]}
        >
          <UIText style={styles.resultTitle}>Resultado: {result.title}</UIText>
          <UIText color="muted">{result.message}</UIText>
          <UIPressable
            appearance="outline"
            onPress={() => setResult(null)}
            text="Limpiar resultado"
          />
        </UIView>
      ) : null}
    </UIView>
  );
}

export default ErrorTester;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  actionsGrid: {
    width: '100%',
    alignSelf: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  actionsFooter: {
    width: '100%',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  gridButton: {
    width: '48%',
    minWidth: 0,
  },
  footerButton: {
    width: '48%',
  },
  resultCard: {
    width: '100%',
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
});
