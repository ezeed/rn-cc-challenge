import { Feather } from '@expo/vector-icons';
import { UIView } from './ui/ui-view';
import { UIText } from './ui/ui-text';
import { useTheme } from '@/lib/theme/theme-provider';
import { StyleSheet } from 'react-native';

export function EmptyState({ message }: { message: string }) {
  const { colors } = useTheme();
  return (
    <UIView style={styles.container}>
      <Feather name="inbox" size={64} color={colors.border} />
      <UIText color="muted">{message || 'No hay datos para mostrar.'}</UIText>
    </UIView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
  },
});
