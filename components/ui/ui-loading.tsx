import { useTheme } from '@/lib/theme/theme-provider';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

export function UILoading({ color, size = 'large', ...rest }: ActivityIndicatorProps) {
  const { colors } = useTheme();
  return <ActivityIndicator color={color ?? colors.primary} size={size} {...rest} />;
}
