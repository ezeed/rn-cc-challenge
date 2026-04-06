import { AxiosError } from 'axios';

export const ErrorCodes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  NOT_FOUND: 'NOT_FOUND',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

export interface ApiErrorBody {
  message?: string;
  detail?: string;
  error?: string;
}

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly isRetryable: boolean;
  readonly statusCode?: number;

  constructor(message: string, code: ErrorCode, isRetryable: boolean, statusCode?: number) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.isRetryable = isRetryable;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static fromAxiosError(error: AxiosError<ApiErrorBody>): AppError {
    if (!error.response) {
      const isTimeout =
        error.code === AxiosError.ETIMEDOUT || error.code === AxiosError.ECONNABORTED;

      if (isTimeout) {
        return new AppError('Request timed out', ErrorCodes.TIMEOUT_ERROR, true);
      }

      return new AppError('Network error', ErrorCodes.NETWORK_ERROR, true);
    }

    const status = error.response.status;
    const data = error.response.data;
    const message = data?.message ?? data?.detail ?? data?.error ?? error.message;

    if (status === 401) {
      return new AppError(message, ErrorCodes.UNAUTHORIZED, false, status);
    }

    if (status === 404) {
      return new AppError(message, ErrorCodes.NOT_FOUND, false, status);
    }

    if (status >= 500) {
      return new AppError(message, ErrorCodes.SERVER_ERROR, true, status);
    }

    if (status >= 400) {
      return new AppError(message, ErrorCodes.VALIDATION_ERROR, false, status);
    }

    return new AppError(message, ErrorCodes.UNKNOWN_ERROR, false, status);
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    switch (error.code) {
      case ErrorCodes.NETWORK_ERROR:
        return 'Revisa tu conexion e intenta nuevamente.';
      case ErrorCodes.TIMEOUT_ERROR:
        return 'La solicitud demoro demasiado. Intenta nuevamente.';
      case ErrorCodes.VALIDATION_ERROR:
        return 'Revisa los datos ingresados e intenta nuevamente.';
      case ErrorCodes.SERVER_ERROR:
        return 'Ocurrio un error en el servidor. Intenta nuevamente en unos momentos.';
      case ErrorCodes.UNAUTHORIZED:
        return 'Tu sesion expiro. Vuelve a iniciar sesion.';
      case ErrorCodes.NOT_FOUND:
        return 'No se encontro el recurso solicitado.';
      case ErrorCodes.UNKNOWN_ERROR:
      default:
        return 'Ocurrio un error. Intenta nuevamente.';
    }
  }

  return 'Ocurrio un error. Intenta nuevamente.';
}
