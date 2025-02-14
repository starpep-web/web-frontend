import 'server-only';
import { LOCAL_DOWNLOADS_URL } from '@lib/config/app';
import { requestText, RequestOptions } from '@lib/services/http/request';

export const client = {
  get: (endpoint: string, options?: RequestOptions) => {
    return requestText(LOCAL_DOWNLOADS_URL, endpoint, 'GET', options);
  }
};
