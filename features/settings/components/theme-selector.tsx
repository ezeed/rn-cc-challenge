import { StyleSheet } from 'react-native';
import { UIPressable } from '@/components/ui/ui-pressable';
import { UIText } from '@/components/ui/ui-text';
import { UIView } from '@/components/ui/ui-view';
import { ThemeMode, useTheme } from '@/lib/theme/theme-provider';

function ThemeSelector() {
  const { colors, mode, setMode } = useTheme();
  const themeOptions: ThemeMode[] = ['system', 'light', 'dark'];

  return (
    <UIView style={styles.container}>
      <UIText variant="title" style={styles.pageTitle}>
        Configuracion
      </UIText>
      <UIText style={styles.sectionTitle}>Tema</UIText>
      <UIView style={styles.options}>
        {themeOptions.map((option) => {
          const isSelected = mode === option;

          return (
            <UIPressable
              key={option}
              variant={isSelected ? 'primary' : 'secondary'}
              style={[
                styles.button,
                {
                  backgroundColor: isSelected ? colors.primary : colors.surface,
                  borderColor: isSelected ? colors.primary : colors.border,
                },
              ]}
              textColor={isSelected ? 'white' : 'default'}
              text={option === 'system' ? 'Sistema' : option === 'light' ? 'Claro' : 'Oscuro'}
              onPress={() => setMode(option)}
            />
          );
        })}
      </UIView>
    </UIView>
  );
}

export default ThemeSelector;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  pageTitle: {
    fontSize: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  options: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '31%',
    minWidth: 0,
    borderWidth: 1,
  },
});
