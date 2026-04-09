import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Cocos Challenge',
  slug: 'rn-cc-challenge',
  scheme: 'rnccchallenge',
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
    'expo-router',
    '@sentry/react-native',
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
    bundler: 'metro',
  },
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL,
    eas: {
      projectId: '903a7d7d-892f-4338-9f7e-e88f0144de7b',
    },
  },
});
