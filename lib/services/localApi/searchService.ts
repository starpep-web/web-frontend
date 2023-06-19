import { http } from './apiService';
import { createPagination, WithPagination } from '@lib/utils/pagination';
import { SingleQueryAlignmentOptions, MultiQueryAlignmentOptions } from '@lib/models/search';
import { FASTA_CONTENT_TYPE, InitialAsyncTaskResponse } from '@lib/services/pythonRestApi/apiService';
import { AxiosError } from 'axios';

export const getMetadataSuggestions = async (metadataName: string, name: string, page: number): Promise<WithPagination<string[]>> => {
  try {
    const response = await http.get(`/api/search/metadata/suggestions/${metadataName}`, {
      params: {
        name,
        page
      }
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
    return {
      data: [],
      pagination: createPagination(0, 0, 0)
    };
  }
};

export type MetadataSuggestionFunction = (name: string, page?: number) => Promise<WithPagination<string[]>>;

export const getDatabaseSuggestions: MetadataSuggestionFunction = (name: string, page = 1) => {
  return getMetadataSuggestions('database', name, page);
};

export const getCTerminusSuggestions: MetadataSuggestionFunction = (name: string, page = 1) => {
  return getMetadataSuggestions('cterminus', name, page);
};

export const getNTerminusSuggestions: MetadataSuggestionFunction = (name: string, page = 1) => {
  return getMetadataSuggestions('nterminus', name, page);
};

export const getFunctionSuggestions: MetadataSuggestionFunction = (name: string, page = 1) => {
  return getMetadataSuggestions('function', name, page);
};

export const getOriginSuggestions: MetadataSuggestionFunction = (name: string, page = 1) => {
  return getMetadataSuggestions('origin', name, page);
};

export const getTargetSuggestions: MetadataSuggestionFunction = (name: string, page = 1) => {
  return getMetadataSuggestions('target', name, page);
};

export const getUnusualAASuggestions: MetadataSuggestionFunction = (name: string, page = 1) => {
  return getMetadataSuggestions('unusualaa', name, page);
};

export const getCrossRefSuggestions: MetadataSuggestionFunction = (name: string, page = 1) => {
  return getMetadataSuggestions('crossref', name, page);
};

export const postSingleQuerySearch = async (fastaQuery: string, options?: SingleQueryAlignmentOptions): Promise<InitialAsyncTaskResponse> => {
  try {
    const response = await http.post('/api/search/single-query', fastaQuery, {
      params: options ?? {},
      headers: {
        'Content-Type': FASTA_CONTENT_TYPE
      }
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error(((error as AxiosError).response?.data as any).error?.message ?? (error as Error).message);
  }
};

export const postMultiQuerySearch = async (fastaQuery: string, options?: MultiQueryAlignmentOptions): Promise<InitialAsyncTaskResponse> => {
  try {
    const response = await http.post('/api/search/multi-query', fastaQuery, {
      params: options ?? {},
      headers: {
        'Content-Type': FASTA_CONTENT_TYPE
      }
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error(((error as AxiosError).response?.data as any).error?.message ?? (error as Error).message);
  }
};
