/* eslint-disable max-len */
import { http, AsyncTaskResponse, InitialAsyncTaskResponse, FASTA_CONTENT_TYPE } from './apiService';
import { SingleQueryAlignmentOptions, SingleAlignedPeptide } from '@lib/models/search';
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
    console.error(error);
    throw error;
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
    console.error(error);
    throw error;
  }
};
