import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { Platform, View } from 'react-native';
import { ErrorBoundary } from '@/components/error-boundary';
import { monitoring } from '@/lib/monitoring/monitoring';
import { queryClient } from '@/lib/query/query-client';
import { ThemeProvider, useTheme } from '@/lib/theme/theme-provider';

monitoring.init();

function RootNavigator() {
  const { colors, resolvedTheme } = useTheme();

  return (
    <ErrorBoundary>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <StatusBar style={resolvedTheme === 'dark' ? 'light' : 'dark'} />
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ contentStyle: { backgroundColor: colors.background } }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(modals)/order"
              options={{
                sheetGrabberVisible: true,
                sheetAllowedDetents: [0.85],
                headerShown: false,
                presentation: Platform.OS === 'ios' ? 'formSheet' : 'modal',
                gestureEnabled: true,
              }}
            />
          </Stack>
        </QueryClientProvider>
      </View>
    </ErrorBoundary>
  );
}

function RootLayout() {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}

export default monitoring.wrap(RootLayout);
