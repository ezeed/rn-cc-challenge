import * as SystemUI from 'expo-system-ui';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';

export type ThemeMode = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  white: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  border: string;
  tabBar: string;
  tabIcon: string;
};

type ThemeContextValue = {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  colors: ThemeColors;
  setMode: (mode: ThemeMode) => void;
};

const LIGHT_COLORS: ThemeColors = {
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
};

const DARK_COLORS: ThemeColors = {
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
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveTheme(mode: ThemeMode, systemScheme: ColorSchemeName): ResolvedTheme {
  if (mode === 'light' || mode === 'dark') return mode;
  return systemScheme === 'dark' ? 'dark' : 'light';
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');

  const resolvedTheme = resolveTheme(mode, systemScheme);
  const colors = resolvedTheme === 'dark' ? DARK_COLORS : LIGHT_COLORS;

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background).catch((error) => {
      if (__DEV__) {
        console.warn('Failed to set system background color', error);
      }
    });
  }, [colors.background]);

  const value = useMemo(
    () => ({
      mode,
      resolvedTheme,
      colors,
      setMode,
    }),
    [colors, mode, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
