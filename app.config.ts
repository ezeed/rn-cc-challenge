import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Cocos Challenge',
  slug: 'rn-cc-challenge',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.ezequielcabrera.rnccchallenge',
  },
  android: {
    package: 'com.ezequielcabrera.rnccchallenge',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#f2f7fd',
    },
  },
  plugins: [
    [
      'expo-splash-screen',
      {
        backgroundColor: '#f2f7fd',
        image: './assets/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        dark: {
          backgroundColor: '#00152e',
          image: './assets/splash-icon-dark.png',
          imageWidth: 200,
        },
      },
    ],
  ],
  web: {
    favicon: './assets/favicon.ico',
  },
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL,
    appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? 'development',
  },
});
