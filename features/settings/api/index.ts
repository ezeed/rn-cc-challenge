import client from '@/lib/api/api-client';

const HTTP_STAT_US = 'https://mock.httpstatus.io';

export const getHTTPStatus = async (code: string | null): Promise<unknown> => {
  if (!code) {
    throw new Error('Status code is required');
  }
  return client.get(`${HTTP_STAT_US}/${code}`);
};
