import { StyleSheet } from 'react-native';
import { UIAnimatedView } from '@/components/ui/ui-animated-view';
import { UIPressable } from '@/components/ui/ui-pressable';
import { UIText } from '@/components/ui/ui-text';
import { ThemeMode, useTheme } from '@/lib/theme/theme-provider';

function ThemeSelector() {
  const { colors, mode, setMode } = useTheme();
  const themeOptions: ThemeMode[] = ['system', 'light', 'dark'];

  return (
    <UIAnimatedView layoutAnimation preset="fadeDown" style={styles.container}>
      <UIText variant="title" style={styles.pageTitle}>
        Configuracion
      </UIText>
      <UIText style={styles.sectionTitle}>Tema</UIText>
      <UIAnimatedView layoutAnimation style={styles.options}>
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
      </UIAnimatedView>
    </UIAnimatedView>
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
