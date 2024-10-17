import 'server-only';
import { BIO_API_URL } from '@lib/config/app';
import { requestJson, RequestOptions } from '@lib/services/http/request';

export const client = {
  get: <T>(endpoint: string, options?: RequestOptions) => {
    return requestJson<T>(BIO_API_URL, endpoint, 'GET', options);
  },
  post: <T>(endpoint: string, options?: RequestOptions) => {
    return requestJson<T>(BIO_API_URL, endpoint, 'POST', options);
  }
};
