import { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/lib/theme/theme-provider';
import { UIText, UITextColor } from './ui-text';

type UIPressableTone = 'primary' | 'secondary' | 'danger';
type UIPressableSize = 'md' | 'sm';
type UIPressableAppearance = 'solid' | 'outline';

type Props = PressableProps & {
  children?: ReactNode;
  variant?: UIPressableTone;
  size?: UIPressableSize;
  appearance?: UIPressableAppearance;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  textColor?: UITextColor;
};

export function UIPressable({
  children,
  variant = 'primary',
  size = 'md',
  appearance = 'solid',
  active = false,
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

  const sizeStyles: Record<UIPressableSize, ViewStyle> = {
    md: { minWidth: 180, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12 },
    sm: { minWidth: 0, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  };

  const outlineStyle: ViewStyle =
    appearance === 'outline'
      ? {
          backgroundColor: active ? colors.primary : 'transparent',
          borderWidth: 1,
          borderColor: active ? colors.primary : colors.border,
        }
      : {};

  const resolvedTextColor: UITextColor =
    appearance === 'outline' ? (active ? 'white' : 'default') : textColor;

  return (
    <Pressable
      {...props}
      disabled={isDisabled}
      style={({ pressed }) => [
        {
          opacity: isDisabled ? 0.6 : pressed ? 0.88 : 1,
        },
        sizeStyles[size],
        appearance === 'solid' ? variantStyles[variant] : outlineStyle,
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={resolvedTextColor === 'white' ? colors.white : colors.text} />
      ) : (
        children || (
          <UIText variant="button" color={resolvedTextColor}>
            {text}
          </UIText>
        )
      )}
    </Pressable>
  );
}
