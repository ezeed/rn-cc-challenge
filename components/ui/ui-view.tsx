import { ReactNode } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '@/lib/theme/theme-provider';

type UIViewBackground = 'background' | 'surface' | 'surfaceMuted';

type Props = ViewProps & {
  children?: ReactNode;
  background?: UIViewBackground;
  style?: StyleProp<ViewStyle>;
};

export function UIView({ children, background, style, ...props }: Props) {
  const { colors } = useTheme();

  const backgroundStyle =
    background === 'background'
      ? { backgroundColor: colors.background }
      : background === 'surface'
        ? { backgroundColor: colors.surface }
        : background === 'surfaceMuted'
          ? { backgroundColor: colors.surfaceMuted }
          : null;

  return (
    <View {...props} style={[backgroundStyle, style]}>
      {children}
    </View>
  );
}
