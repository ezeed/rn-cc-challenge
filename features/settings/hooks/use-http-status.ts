import { useMutation } from '@tanstack/react-query';
import { getHTTPStatus } from '../api';

export function useHTTPStatus() {
  return useMutation({
    mutationFn: (status: string) => getHTTPStatus(status),
  });
}
