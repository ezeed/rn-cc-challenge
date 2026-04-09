import * as Sentry from '@sentry/react-native';
import type { ComponentType } from 'react';

const DSN = process.env.EXPO_PUBLIC_SENTRY_DSN?.trim() || undefined;
const IS_DEV = __DEV__;
const ALLOW_DEV_SENTRY = process.env.EXPO_PUBLIC_SENTRY_DEV === 'true';
const SHOULD_SEND = Boolean(DSN) && (!IS_DEV || ALLOW_DEV_SENTRY);

function wrapComponent<T extends ComponentType<any>>(Component: T): T {
  if (!SHOULD_SEND) {
    return Component;
  }

  return Sentry.wrap(Component) as T;
}

export const monitoring = {
  init(): void {
    if (!SHOULD_SEND) return;

    Sentry.init({
      dsn: DSN!,
      debug: IS_DEV,
      enabled: true,
      environment: IS_DEV ? 'development' : 'production',
      beforeSend(event) {
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

  wrap: wrapComponent,
};
