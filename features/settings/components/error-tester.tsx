import { StyleSheet } from 'react-native';
import { UIPressable } from '@/components/ui/ui-pressable';
import { UIText } from '@/components/ui/ui-text';
import { UIView } from '@/components/ui/ui-view';
import client from '@/lib/api/api-client';
import { getErrorMessage } from '@/lib/errors/api-errors';
import { monitoring } from '@/lib/monitoring/monitoring';
import { useTheme } from '@/lib/theme/theme-provider';
import { useState } from 'react';

type ResultState = {
  title: string;
  message: string;
};

const HTTP_STAT_US = 'https://httpstat.us';

function ErrorTester() {
  const { colors } = useTheme();
  const [result, setResult] = useState<ResultState | null>(null);
  const [shouldCrash, setShouldCrash] = useState(false);

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

  const clearResult = () => setResult(null);

  return (
    <UIView style={styles.container}>
      <UIText style={styles.sectionTitle}>Pruebas de errores</UIText>
      <UIText color="muted">
        Usa estos botones para validar mensajes, consola, red y monitoreo.
      </UIText>

      <UIView style={styles.actionsGrid}>
        <UIPressable
          style={styles.gridButton}
          text="404"
          onPress={async () => {
            clearResult();
            try {
              await client.get(`${HTTP_STAT_US}/404`);
            } catch (error) {
              handleError('404', error);
            }
          }}
        />

        <UIPressable
          style={styles.gridButton}
          text="500"
          onPress={async () => {
            clearResult();
            try {
              await client.get(`${HTTP_STAT_US}/500`);
            } catch (error) {
              handleError('500', error);
            }
          }}
        />

        <UIPressable
          style={styles.gridButton}
          text="timeout"
          onPress={async () => {
            clearResult();
            try {
              await client.get(`${HTTP_STAT_US}/200?sleep=5000`, {
                timeout: 1_000,
              });
            } catch (error) {
              handleError('timeout', error);
            }
          }}
        />

        <UIPressable
          style={styles.gridButton}
          text="error manual"
          onPress={() => {
            clearResult();
            handleError('manual', new Error('Dev manual error'));
          }}
        />
      </UIView>

      <UIView style={styles.actionsFooter}>
        <UIPressable
          variant="danger"
          style={styles.footerButton}
          text="ErrorBoundary"
          onPress={() => {
            clearResult();
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
