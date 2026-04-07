import { useTheme } from '@/lib/theme/theme-provider';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

type UISafeAreaProps = SafeAreaViewProps & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function UISafeArea({ children, style, ...rest }: UISafeAreaProps) {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }, style]}
      {...rest}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
