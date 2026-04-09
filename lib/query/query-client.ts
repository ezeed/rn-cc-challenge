import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { AppError } from '@/lib/errors/api-errors';
import { monitoring } from '@/lib/monitoring/monitoring';

const MAX_RETRIES = 2;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: (failureCount: number, error: Error): boolean => {
        if (failureCount >= MAX_RETRIES) return false;
        if (error instanceof AppError) return error.isRetryable;
        return false;
      },
      retryDelay: 1_000,
    },
    mutations: {
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => monitoring.captureException(error),
  }),
  mutationCache: new MutationCache({
    onError: (error) => monitoring.captureException(error),
  }),
});
