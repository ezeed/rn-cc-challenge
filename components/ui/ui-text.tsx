import { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '@/lib/theme/theme-provider';

type UITextVariant = 'title' | 'body' | 'button';
export type UITextColor = 'default' | 'muted' | 'white' | 'primary' | 'secondary' | 'danger';
type UITextAlign = TextStyle['textAlign'];

type Props = TextProps & {
  children: ReactNode;
  variant?: UITextVariant;
  color?: UITextColor;
  textAlign?: UITextAlign;
  style?: StyleProp<TextStyle>;
};

export function UIText({
  children,
  variant = 'body',
  color = 'default',
  textAlign,
  style,
  ...props
}: Props) {
  const { colors, typography } = useTheme();

  const colorStyles: Record<UITextColor, TextStyle> = {
    default: { color: colors.text },
    muted: { color: colors.textMuted },
    white: { color: colors.white },
    primary: { color: colors.primary },
    secondary: { color: colors.secondary },
    danger: { color: colors.danger },
  };

  const variantStyles: Record<UITextVariant, TextStyle> = {
    title: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.xl,
      fontWeight: typography.fontWeight.semibold,
      marginBottom: 8,
    },
    body: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.md,
      fontWeight: typography.fontWeight.regular,
    },
    button: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.md,
      fontWeight: typography.fontWeight.semibold,
      textAlign: 'center',
    },
  };

  const alignmentStyle = textAlign ? { textAlign } : null;

  return (
    <Text
      {...props}
      style={[styles.base, variantStyles[variant], colorStyles[color], alignmentStyle, style]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
