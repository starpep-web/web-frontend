import { client } from '@lib/services/api/client';
import { ApiResponse, WithPagination } from '@lib/services/api/models/api';

const getMetadataSuggestions = async (label: string, query: string, page: number): Promise<WithPagination<string>> => {
  const response = await client.get<ApiResponse<WithPagination<string>>>('/search/suggestions/metadata', {
    query: { label, query, page }
  });
  return response.data;
};

export const getDatabaseSuggestions = (query: string, page: number = 1): Promise<WithPagination<string>> => {
  return getMetadataSuggestions('Database', query, page);
};

export const getCTerminusSuggestions = (query: string, page: number = 1): Promise<WithPagination<string>> => {
  return getMetadataSuggestions('Cterminus', query, page);
};

export const getNTerminusSuggestions = (query: string, page: number = 1): Promise<WithPagination<string>> => {
  return getMetadataSuggestions('Nterminus', query, page);
};

export const getFunctionSuggestions = (query: string, page: number = 1): Promise<WithPagination<string>> => {
  return getMetadataSuggestions('Function', query, page);
};

export const getOriginSuggestions = (query: string, page: number = 1): Promise<WithPagination<string>> => {
  return getMetadataSuggestions('Origin', query, page);
};

export const getTargetSuggestions = (query: string, page: number = 1): Promise<WithPagination<string>> => {
  return getMetadataSuggestions('Target', query, page);
};

export const getUnusualAASuggestions = (query: string, page: number = 1): Promise<WithPagination<string>> => {
  return getMetadataSuggestions('UnusualAA', query, page);
};

export const getCrossRefSuggestions = (query: string, page: number = 1): Promise<WithPagination<string>> => {
  return getMetadataSuggestions('CrossRef', query, page);
};
