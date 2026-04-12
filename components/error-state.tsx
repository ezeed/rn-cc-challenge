import { Feather } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { UIView } from '@/components/ui/ui-view';
import { UIText } from '@/components/ui/ui-text';
import { UIPressable } from '@/components/ui/ui-pressable';
import { useTheme } from '@/lib/theme/theme-provider';

type Props = {
  message: string;
  onRetry?: () => void;
};

export function ErrorState({ message, onRetry }: Props) {
  const { colors } = useTheme();
  return (
    <UIView style={styles.container}>
      <Feather name="alert-circle" size={64} color={colors.danger} />
      <UIText variant="title" textAlign="center">
        {message}
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
