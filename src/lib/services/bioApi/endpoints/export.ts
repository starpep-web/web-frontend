import { AsyncTaskResponse, InitialAsyncTaskResponse } from '@lib/services/bioApi/models/asyncTask';
import { client } from '@lib/services/bioApi/client';
import { BioApiResponse } from '@lib/services/bioApi/models/api';
import { ExportRequestPayload, ExportResult } from '@lib/services/bioApi/models/export';

export const postTextQueryExport = async (payload: ExportRequestPayload): Promise<InitialAsyncTaskResponse> => {
  const response = await client.post<BioApiResponse<InitialAsyncTaskResponse>>('/export/text-query', {
    data: payload
  });
  return response.data;
};

export const getTextQueryExport = async (taskId: string): Promise<AsyncTaskResponse<ExportResult>> => {
  const response = await client.get<BioApiResponse<AsyncTaskResponse<ExportResult>>>(`/export/text-query/${taskId}`);
  return response.data;
};

export const postSingleQueryExport = async (payload: ExportRequestPayload): Promise<InitialAsyncTaskResponse> => {
  const response = await client.post<BioApiResponse<InitialAsyncTaskResponse>>('/export/single-query', {
    data: payload
  });
  return response.data;
};

export const getSingleQueryExport = async (taskId: string): Promise<AsyncTaskResponse<ExportResult>> => {
  const response = await client.get<BioApiResponse<AsyncTaskResponse<ExportResult>>>(`/export/single-query/${taskId}`);
  return response.data;
};

export const postMultiQueryExport = async (payload: ExportRequestPayload): Promise<InitialAsyncTaskResponse> => {
  const response = await client.post<BioApiResponse<InitialAsyncTaskResponse>>('/export/multi-query', {
    data: payload
  });
  return response.data;
};

export const getMultiQueryExport = async (taskId: string): Promise<AsyncTaskResponse<ExportResult>> => {
  const response = await client.get<BioApiResponse<AsyncTaskResponse<ExportResult>>>(`/export/multi-query/${taskId}`);
  return response.data;
};
