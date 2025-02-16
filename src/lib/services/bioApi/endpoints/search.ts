import { AsyncTaskResponse, InitialAsyncTaskResponse } from '@lib/services/bioApi/models/asyncTask';
import { client } from '@lib/services/bioApi/client';
import { BioApiResponse, WithPagination } from '@lib/services/bioApi/models/api';
import { SingleQueryAlignmentOptions, MultiQueryAlignmentOptions, SingleQueryAlignmentContext, MultiQueryAlignmentContext } from '@lib/services/bioApi/models/search';
import { SingleAlignedPeptide, MultiAlignedPeptide } from '@lib/services/bioApi/models/peptide';
import { CONTENT_TYPE_FASTA } from '@lib/services/http/headers';
import { DEFAULT_MULTI_ALIGNMENT_OPTIONS, DEFAULT_SINGLE_ALIGNMENT_OPTIONS } from '@lib/services/bioApi/helpers/search';

export const postSingleQuerySearch = async (fasta: string, options?: SingleQueryAlignmentOptions): Promise<InitialAsyncTaskResponse> => {
  const response = await client.post<BioApiResponse<InitialAsyncTaskResponse>>('/search/single-query', {
    query: { ...DEFAULT_SINGLE_ALIGNMENT_OPTIONS, ...options || {} },
    data: fasta,
    headers: { 'Content-Type': CONTENT_TYPE_FASTA }
  });
  return response.data;
};

export const getSingleQuerySearch = async (taskId: string, page: number = 1): Promise<AsyncTaskResponse<WithPagination<SingleAlignedPeptide>, SingleQueryAlignmentContext>> => {
  const response = await client.get<BioApiResponse<AsyncTaskResponse<WithPagination<SingleAlignedPeptide>, SingleQueryAlignmentContext>>>(`/search/single-query/${taskId}`, {
    query: { page },
    noCache: true
  });
  return response.data;
};

export const postMultiQuerySearch = async (fasta: string, options?: MultiQueryAlignmentOptions): Promise<InitialAsyncTaskResponse> => {
  const response = await client.post<BioApiResponse<InitialAsyncTaskResponse>>('/search/multi-query', {
    query: { ...DEFAULT_MULTI_ALIGNMENT_OPTIONS, ...options || {} },
    data: fasta,
    headers: { 'Content-Type': CONTENT_TYPE_FASTA }
  });
  return response.data;
};

export const getMultiQuerySearch = async (taskId: string, page: number = 1): Promise<AsyncTaskResponse<WithPagination<MultiAlignedPeptide>, MultiQueryAlignmentContext>> => {
  const response = await client.get<BioApiResponse<AsyncTaskResponse<WithPagination<MultiAlignedPeptide>, MultiQueryAlignmentContext>>>(`/search/multi-query/${taskId}`, {
    query: { page },
    noCache: true
  });
  return response.data;
};
