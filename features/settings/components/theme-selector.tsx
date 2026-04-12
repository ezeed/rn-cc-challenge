import { StyleSheet } from 'react-native';
import { UIAnimatedView } from '@/components/ui/ui-animated-view';
import { UIText } from '@/components/ui/ui-text';
import { UIToggleGroup } from '@/components/ui/ui-toggle-group';
import { ThemeMode, useTheme } from '@/lib/theme/theme-provider';

const THEME_OPTIONS: { label: string; value: ThemeMode }[] = [
  { label: 'Sistema', value: 'system' },
  { label: 'Claro', value: 'light' },
  { label: 'Oscuro', value: 'dark' },
];

function ThemeSelector() {
  const { mode, setMode } = useTheme();

  return (
    <UIAnimatedView layoutAnimation preset="fadeDown" style={styles.container}>
      <UIText variant="title" style={styles.pageTitle}>
        Configuracion
      </UIText>
      <UIText style={styles.sectionTitle}>Tema</UIText>
      <UIToggleGroup options={THEME_OPTIONS} value={mode} onChange={setMode} />
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
});
