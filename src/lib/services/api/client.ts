import { API_URL, NEXT_REVALIDATE_TIME } from '@lib/config/app';

const request = async <T>(endpoint: string, method: string): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    next: {
      revalidate: NEXT_REVALIDATE_TIME
    }
  });

  return response.json();
};

export const client = {
  get: <T>(endpoint: string) => {
    return request<T>(endpoint, 'GET');
  }
};
