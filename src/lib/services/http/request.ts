import { NEXT_REVALIDATE_TIME } from '@lib/config/app';
import { RequestError } from '@lib/services/http/error';

type RequestConfig = RequestInit & {
  next?: {
    revalidate?: number
  }
};

export type RequestOptions = {
  query?: Record<string, string | string[] | number | undefined | null>
  data?: object | string | null
  headers?: Record<string, string>
  noCache?: boolean
};

const request = async (baseUrl: string, endpoint: string, method: string, options?: RequestOptions): Promise<Response> => {
  let url = `${baseUrl}${endpoint}`;

  if (options?.query) {
    const params = new URLSearchParams();

    Object.entries(options.query).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        value.forEach((innerValue) => {
          params.append(name, innerValue);
        });
      } else {
        if (typeof value !== 'undefined' && value !== null) {
          params.append(name, value.toString());
        }
      }
    });

    url += `?${params.toString()}`;
  }

  const config: RequestConfig = {
    method,
    next: {
      revalidate: options?.noCache ? 0 : NEXT_REVALIDATE_TIME
    }
  };

  if (options?.headers) {
    config.headers = { ...config.headers, ...options.headers };
  }

  if (options?.data) {
    if (options?.headers) {
      if (options.headers['Content-Type'] === 'application/json') {
        config.body = JSON.stringify(options.data);
      } else {
        config.body = options.data.toString();
      }
    } else {
      config.body = JSON.stringify(options.data);
      config.headers = { ...config.headers, 'Content-Type': 'application/json' };
    }
  }

  return await fetch(url, config);
};

export const requestJson = async <T>(baseUrl: string, endpoint: string, method: string, options?: RequestOptions): Promise<T> => {
  const response = await request(baseUrl, endpoint, method, options);
  if (!response.ok) {
    throw new RequestError(response.statusText, response, await response.json());
  }
  return response.json();
};

export const requestText = async (baseUrl: string, endpoint: string, method: string, options?: RequestOptions): Promise<string> => {
  const response = await request(baseUrl, endpoint, method, options);
  if (!response.ok) {
    throw new RequestError(response.statusText, response, await response.text());
  }
  return response.text();
};
