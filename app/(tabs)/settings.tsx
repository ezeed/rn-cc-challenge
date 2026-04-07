import { ErrorTester, ThemeSelector } from '@/features/settings';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/lib/theme/theme-provider';
import { UISafeArea } from '@/components/ui/ui-safe-area';

export default function SettingsScreen() {
  const { colors } = useTheme();

  return (
    <UISafeArea>
      <ScrollView
        contentContainerStyle={styles.content}
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <ThemeSelector />
        <ErrorTester />
      </ScrollView>
    </UISafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 24,
  },
});
