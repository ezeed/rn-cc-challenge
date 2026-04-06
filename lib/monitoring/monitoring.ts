import * as Sentry from '@sentry/react-native';

const DSN = process.env.EXPO_PUBLIC_SENTRY_DSN;
const IS_DEV = __DEV__;
const ALLOW_DEV_SENTRY = process.env.EXPO_PUBLIC_SENTRY_DEV === 'true';
const SHOULD_SEND = !IS_DEV || ALLOW_DEV_SENTRY;

export const monitoring = {
  init(): void {
    if (!DSN) return;

    Sentry.init({
      dsn: DSN,
      debug: IS_DEV,
      enabled: SHOULD_SEND,
      environment: IS_DEV ? 'development' : 'production',
      beforeSend(event) {
        if (!SHOULD_SEND) return null;
        return event;
      },
    });
  },

  captureException(error: unknown, context?: Record<string, unknown>): void {
    if (!SHOULD_SEND) {
      console.error('[monitoring]', error, context);
      return;
    }
    Sentry.withScope((scope) => {
      if (context) scope.setExtras(context);
      Sentry.captureException(error);
    });
  },

  captureMessage(message: string, level: Sentry.SeverityLevel = 'info'): void {
    if (!SHOULD_SEND) {
      console.log(`[monitoring:${level}]`, message);
      return;
    }
    Sentry.captureMessage(message, level);
  },

  wrap: Sentry.wrap,
};
