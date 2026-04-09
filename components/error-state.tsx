import { StyleSheet } from 'react-native';
import { UIView } from '@/components/ui/ui-view';
import { UIText } from '@/components/ui/ui-text';
import { UIPressable } from '@/components/ui/ui-pressable';

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <UIView style={styles.container}>
      <UIText variant="title" style={{ marginBottom: 8 }}>
        {message}
      </UIText>
      <UIPressable variant="danger" onPress={onRetry} text="Reintentar" />
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
