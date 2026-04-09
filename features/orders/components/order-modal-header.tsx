import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { UIPressable } from '@/components/ui/ui-pressable';
import { UIView } from '@/components/ui/ui-view';
import { useTheme } from '@/lib/theme/theme-provider';

type Props = {
  onClose: () => void;
};

export function OrderModalHeader({ onClose }: Props) {
  const { colors } = useTheme();

  return (
    <UIView style={styles.header}>
      <UIPressable appearance="outline" onPress={onClose} size="sm" style={styles.closeButton}>
        <Feather color={colors.text} name="x" size={16} />
      </UIPressable>
    </UIView>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    minWidth: 0,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    marginBottom: 0,
  },
});
