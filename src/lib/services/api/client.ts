import { API_URL, NEXT_REVALIDATE_TIME } from '@lib/config/app';

type RequestOptions = {
  query?: Record<string, string | string[]>
};

const request = async <T>(endpoint: string, method: string, options?: RequestOptions): Promise<T> => {
  let url = `${API_URL}${endpoint}`;

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

  const response = await fetch(url, {
    method,
    next: {
      revalidate: NEXT_REVALIDATE_TIME
    }
  });

  return response.json();
};

export const client = {
  get: <T>(endpoint: string, options?: RequestOptions) => {
    return request<T>(endpoint, 'GET', options);
  }
};
