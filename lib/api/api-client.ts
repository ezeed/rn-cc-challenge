import axios, { isAxiosError } from 'axios';
import { AppError, ApiErrorBody, ErrorCodes } from '@/lib/errors/api-errors';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? '';
const TIMEOUT_MS = 15_000;

const client = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

client.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isAxiosError<ApiErrorBody>(error)) {
      return Promise.reject(AppError.fromAxiosError(error));
    }

    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return Promise.reject(new AppError(message, ErrorCodes.UNKNOWN_ERROR, false));
  },
);

export default client;
