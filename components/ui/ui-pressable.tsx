import { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/lib/theme/theme-provider';
import { UIText, UITextColor } from './ui-text';

type UIPressableTone = 'primary' | 'secondary' | 'danger';

type Props = PressableProps & {
  children?: ReactNode;
  variant?: UIPressableTone;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  textColor?: UITextColor;
};

export function UIPressable({
  children,
  variant = 'primary',
  style,
  loading,
  disabled,
  text,
  textColor = 'white',
  ...props
}: Props) {
  const { colors } = useTheme();
  const isDisabled = disabled || loading;

  const variantStyles: Record<UIPressableTone, ViewStyle> = {
    primary: { backgroundColor: colors.primary },
    secondary: { backgroundColor: colors.secondary },
    danger: { backgroundColor: colors.danger },
  };

  return (
    <Pressable
      {...props}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          opacity: isDisabled ? 0.6 : pressed ? 0.88 : 1,
          textAlign: 'center',
        },
        variantStyles[variant],
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        children || (
          <UIText variant="button" color={textColor}>
            {text}
          </UIText>
        )
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minWidth: 180,
  },
});
