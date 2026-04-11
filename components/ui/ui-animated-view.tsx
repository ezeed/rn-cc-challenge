import { ComponentProps } from 'react';
import Animated, {
  FadeIn,
  FadeInDown,
  LinearTransition,
  ReduceMotion,
} from 'react-native-reanimated';
import { useTheme } from '@/lib/theme/theme-provider';

type UIAnimatedViewBackground = 'background' | 'surface' | 'surfaceMuted';
type UIAnimatedViewPreset = 'fade' | 'fadeDown';

type Props = ComponentProps<typeof Animated.View> & {
  background?: UIAnimatedViewBackground;
  preset?: UIAnimatedViewPreset;
  layoutAnimation?: boolean;
};

const ENTERING_PRESETS = {
  fade: FadeIn.duration(260).reduceMotion(ReduceMotion.System),
  fadeDown: FadeInDown.duration(280).reduceMotion(ReduceMotion.System),
} as const;

const DEFAULT_LAYOUT = LinearTransition.duration(280).reduceMotion(ReduceMotion.System);

export function UIAnimatedView({
  children,
  background,
  style,
  preset = 'fade',
  layoutAnimation = false,
  entering,
  layout,
  ...props
}: Props) {
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
    <Animated.View
      {...props}
      entering={entering ?? ENTERING_PRESETS[preset]}
      layout={layout ?? (layoutAnimation ? DEFAULT_LAYOUT : undefined)}
      style={[backgroundStyle, style]}
    >
      {children}
    </Animated.View>
  );
}
