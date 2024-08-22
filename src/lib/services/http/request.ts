import { NEXT_REVALIDATE_TIME } from '@lib/config/app';

export type RequestOptions = {
  query?: Record<string, string | string[]>
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
        params.append(name, value);
      }
    });

    url += `?${params.toString()}`;
  }

  return await fetch(url, {
    method,
    next: {
      revalidate: NEXT_REVALIDATE_TIME
    }
  });
};

export const requestJson = async <T>(baseUrl: string, endpoint: string, method: string, options?: RequestOptions): Promise<T> => {
  const response = await request(baseUrl, endpoint, method, options);
  return response.json();
};

export const requestText = async (baseUrl: string, endpoint: string, method: string, options?: RequestOptions): Promise<string> => {
  const response = await request(baseUrl, endpoint, method, options);
  return response.text();
};
