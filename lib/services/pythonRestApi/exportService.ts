import { http, AsyncTaskResponse, InitialAsyncTaskResponse, resolveAxiosError } from './apiService';
import { ExportRequestPayload, ExportResult, SearchType } from '@lib/models/export';

export const postSearchExport = async (payload: ExportRequestPayload): Promise<InitialAsyncTaskResponse> => {
  try {
    const { type } = payload;
    const response = await http.post(`/peptides/export/${type}-query`, payload);

    return response.data;
  } catch (error) {
    throw resolveAxiosError(error);
  }
};

export const getSearchExportResult = async (type: SearchType, taskId: string): Promise<AsyncTaskResponse<ExportResult>> => {
  try {
    const response = await http.get(`/peptides/export/${type}-query/${taskId}`);

    return response.data;
  } catch (error) {
    throw resolveAxiosError(error);
  }
};
