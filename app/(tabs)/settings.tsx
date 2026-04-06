import client from '@/lib/api/api-client';
import { getErrorMessage } from '@/lib/errors/api-errors';
import { monitoring } from '@/lib/monitoring/monitoring';
import { ThemeMode, useTheme } from '@/lib/theme/theme-provider';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ResultState = {
  title: string;
  message: string;
};

const HTTP_STAT_US = 'https://httpstat.us';

// TODO: extraer a un componente separado, no es específico de settings e implementar token colors
export default function SettingsScreen() {
  const { colors, mode, setMode } = useTheme();
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
  const themeOptions: ThemeMode[] = ['system', 'light', 'dark'];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.content}
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.title, { color: colors.text }]}>Configuracion</Text>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Tema</Text>
        <View style={styles.themeOptions}>
          {themeOptions.map((option) => {
            const isSelected = mode === option;

            return (
              <Pressable
                key={option}
                style={[
                  styles.themeButton,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.surface,
                    borderColor: isSelected ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setMode(option)}
              >
                <Text
                  style={[
                    styles.themeButtonText,
                    { color: isSelected ? colors.white : colors.text },
                  ]}
                >
                  {option === 'system' ? 'Sistema' : option === 'light' ? 'Claro' : 'Oscuro'}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Pruebas de errores</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Usa estos botones para validar mensajes, consola, red y monitoreo.
        </Text>

        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={async () => {
            clearResult();
            try {
              await client.get(`${HTTP_STAT_US}/404`);
            } catch (error) {
              handleError('404', error);
            }
          }}
        >
          <Text style={[styles.buttonText, { color: colors.white }]}>Probar 404</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={async () => {
            clearResult();
            try {
              await client.get(`${HTTP_STAT_US}/500`);
            } catch (error) {
              handleError('500', error);
            }
          }}
        >
          <Text style={[styles.buttonText, { color: colors.white }]}>Probar 500</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }]}
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
        >
          <Text style={[styles.buttonText, { color: colors.white }]}>Probar timeout</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => {
            clearResult();
            handleError('manual', new Error('Dev manual error'));
          }}
        >
          <Text style={[styles.buttonText, { color: colors.white }]}>Probar error manual</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: colors.danger }]}
          onPress={() => {
            clearResult();
            setShouldCrash(true);
          }}
        >
          <Text style={[styles.buttonText, { color: colors.white }]}>Probar ErrorBoundary</Text>
        </Pressable>

        {result ? (
          <View style={[styles.resultCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.resultTitle, { color: colors.text }]}>
              Resultado: {result.title}
            </Text>
            <Text style={[styles.resultMessage, { color: colors.textMuted }]}>
              {result.message}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 12,
  },
  title: {
    marginBottom: 8,
    fontSize: 28,
    fontWeight: '700',
  },
  sectionTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 22,
  },
  themeOptions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  themeButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  themeButtonText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  resultCard: {
    marginTop: 12,
    borderRadius: 16,
    padding: 16,
  },
  resultTitle: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '700',
  },
  resultMessage: {
    fontSize: 15,
    lineHeight: 22,
  },
});
