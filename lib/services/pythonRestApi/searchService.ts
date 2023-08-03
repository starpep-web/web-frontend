import { http, AsyncTaskResponse, InitialAsyncTaskResponse, FASTA_CONTENT_TYPE, resolveAxiosError } from './apiService';
import { SingleQueryAlignmentOptions, SingleAlignedPeptide, MultiQueryAlignmentOptions, MultiAlignedPeptide } from '@lib/models/search';
import { WithPagination } from '@lib/utils/pagination';

export const postSingleQuerySearch = async (fastaQuery: string, options?: SingleQueryAlignmentOptions): Promise<InitialAsyncTaskResponse> => {
  try {
    const response = await http.post('/peptides/search/single-query', fastaQuery, {
      params: options ?? {},
      headers: {
        'Content-Type': FASTA_CONTENT_TYPE
      }
    });

    return response.data;
  } catch (error) {
    throw resolveAxiosError(error);
  }
};

export const getSingleQuerySearch = async (taskId: string, page: number = 1): Promise<AsyncTaskResponse<WithPagination<SingleAlignedPeptide[]>>> => {
  try {
    const response = await http.get(`/peptides/search/single-query/${taskId}`, {
      params: {
        page
      }
    });

    return response.data;
  } catch (error) {
    throw resolveAxiosError(error);
  }
};

export const postMultiQuerySearch = async (fastaQuery: string, options?: MultiQueryAlignmentOptions): Promise<InitialAsyncTaskResponse> => {
  try {
    const response = await http.post('/peptides/search/multi-query', fastaQuery, {
      params: options ?? {},
      headers: {
        'Content-Type': FASTA_CONTENT_TYPE
      }
    });

    return response.data;
  } catch (error) {
    throw resolveAxiosError(error);
  }
};

export const getMultiQuerySearch = async (taskId: string, page: number = 1): Promise<AsyncTaskResponse<WithPagination<MultiAlignedPeptide[]>>> => {
  try {
    const response = await http.get(`/peptides/search/multi-query/${taskId}`, {
      params: {
        page
      }
    });

    return response.data;
  } catch (error) {
    throw resolveAxiosError(error);
  }
};
