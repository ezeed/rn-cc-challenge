import { Feather } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { UIView } from '@/components/ui/ui-view';
import { UIText } from '@/components/ui/ui-text';
import { UIPressable } from '@/components/ui/ui-pressable';
import { useTheme } from '@/lib/theme/theme-provider';
import { getErrorMessage } from '@/lib/errors/api-errors';

type Props = {
  error?: unknown;
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({ error, message, onRetry }: Props) {
  const { colors } = useTheme();
  const text = message ?? getErrorMessage(error);
  return (
    <UIView style={styles.container}>
      <Feather name="alert-circle" size={64} color={colors.danger} />
      <UIText variant="title" textAlign="center">
        {text}
      </UIText>
      <UIPressable variant="danger" onPress={onRetry ?? router.back} text="Reintentar" />
    </UIView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
});
