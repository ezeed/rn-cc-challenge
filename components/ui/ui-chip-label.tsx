import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { UIText } from '@/components/ui/ui-text';
import { UIView } from '@/components/ui/ui-view';
import { useTheme } from '@/lib/theme/theme-provider';

type Props = {
  label: string;
  value: string;
  sortBy: string | null;
  arrow: string;
};

export function UIChipLabel({ label, value, sortBy, arrow }: Props) {
  const { colors } = useTheme();

  if (sortBy === value) {
    return (
      <UIView style={styles.chipContent}>
        <UIText color="white">{arrow}</UIText>
        <UIText color="white">{label}</UIText>
      </UIView>
    );
  }

  return (
    <UIView style={styles.chipContent}>
      <MaterialIcons name="sort" size={14} color={colors.textMuted} />
      <UIText color="muted">{label}</UIText>
    </UIView>
  );
}

const styles = StyleSheet.create({
  chipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
