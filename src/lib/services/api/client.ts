import 'server-only';
import { API_URL } from '@lib/config/app';
import { requestJson, RequestOptions } from '@lib/services/http/request';

export const client = {
  get: <T>(endpoint: string, options?: RequestOptions) => {
    return requestJson<T>(API_URL, endpoint, 'GET', options);
  }
};
