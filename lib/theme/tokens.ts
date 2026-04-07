import { Platform } from 'react-native';

export const colorPalettes = {
  light: {
    background: '#f2f7fd',
    surface: '#ffffff',
    surfaceMuted: '#dbeafe',
    text: '#0f172a',
    textMuted: '#475569',
    white: '#ffffff',
    primary: '#0061e0',
    secondary: '#002c66',
    success: '#15803d',
    warning: '#b45309',
    danger: '#b42318',
    border: '#d9e5f3',
    tabBar: '#ffffff',
    tabIcon: '#64748b',
  },
  dark: {
    background: '#08111f',
    surface: '#0f172a',
    surfaceMuted: '#172554',
    text: '#f8fafc',
    textMuted: '#94a3b8',
    white: '#ffffff',
    primary: '#60a5fa',
    secondary: '#7fb2ff',
    success: '#4ade80',
    warning: '#fbbf24',
    danger: '#f87171',
    border: '#1e293b',
    tabBar: '#0f172a',
    tabIcon: '#94a3b8',
  },
} as const;

export const typography = {
  fontFamily: Platform.select({
    ios: {
      sans: 'Manrope',
      serif: 'ui-serif',
      rounded: 'ui-rounded',
      mono: 'ui-monospace',
    },
    android: {
      sans: 'Manrope',
      serif: 'serif',
      rounded: 'sans-serif',
      mono: 'monospace',
    },
    default: {
      sans: 'Manrope',
      serif: 'serif',
      rounded: 'sans-serif',
      mono: 'monospace',
    },
    web: {
      sans: "Manrope, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      serif: "Georgia, 'Times New Roman', serif",
      rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
      mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
  }),
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;
