import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/lib/theme/theme-provider';

export default function InstrumentsScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Instruments</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: '600',
  },
  button: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0061e0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
