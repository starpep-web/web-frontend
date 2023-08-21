import { AxiosError } from 'axios';
import { http } from '@lib/services/localApi/apiService';
import { ExportRequestPayload } from '@lib/models/export';
import { InitialAsyncTaskResponse } from '@lib/services/pythonRestApi/apiService';

export const postSearchExport = async (payload: ExportRequestPayload): Promise<InitialAsyncTaskResponse> => {
  try {
    const response = await http.post('/api/search/export', payload);

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error(((error as AxiosError).response?.data as any).error?.message ?? (error as Error).message);
  }
};
