import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SystemUI from 'expo-system-ui';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { colorPalettes, typography } from '@/lib/theme/tokens';

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
  typography: typeof typography;
  setMode: (mode: ThemeMode) => void;
};

const THEME_MODE_STORAGE_KEY = 'theme-mode';
const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveTheme(mode: ThemeMode, systemScheme: ColorSchemeName): ResolvedTheme {
  if (mode === 'light' || mode === 'dark') return mode;
  return systemScheme === 'dark' ? 'dark' : 'light';
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');

  const resolvedTheme = resolveTheme(mode, systemScheme);
  const colors: ThemeColors = resolvedTheme === 'dark' ? colorPalettes.dark : colorPalettes.light;
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background).catch((error) => {
      if (__DEV__) {
        console.warn('Failed to set system background color', error);
      }
    });
  }, [colors.background]);

  useEffect(() => {
    AsyncStorage.getItem(THEME_MODE_STORAGE_KEY)
      .then((storedMode) => {
        if (storedMode === 'system' || storedMode === 'light' || storedMode === 'dark') {
          setMode(storedMode);
        }
      })
      .catch((error) => {
        if (__DEV__) {
          console.warn('Failed to load theme mode', error);
        }
      })
      .finally(() => {
        setIsHydrated(true);
      });
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    AsyncStorage.setItem(THEME_MODE_STORAGE_KEY, mode).catch((error) => {
      if (__DEV__) {
        console.warn('Failed to persist theme mode', error);
      }
    });
  }, [isHydrated, mode]);

  const value = useMemo(
    () => ({
      mode,
      resolvedTheme,
      colors,
      typography,
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
