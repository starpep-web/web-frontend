import { client } from '@lib/services/api/client';
import { ApiResponse, WithPagination } from '@lib/services/api/models/api';
import { SearchPeptide } from '@lib/services/api/models/peptide';
import { TextQueryFilterParams, TextQueryResponseParams } from '@lib/services/api/models/search';

const getMetadataSuggestions = async (label: string, query: string, page: number): Promise<WithPagination<string>> => {
  const response = await client.get<ApiResponse<WithPagination<string>>>('/search/suggestions/metadata', {
    query: { label: label, query, page }
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

export const postTextQuery = async (
  sequence: string,
  filters?: TextQueryFilterParams,
  page: number = 1
): Promise<WithPagination<SearchPeptide> & { context: { params: TextQueryResponseParams } }> => {
  const response = await client.post<ApiResponse<WithPagination<SearchPeptide> & { context: { params: TextQueryResponseParams } }>>('/search/text-query', {
    data: { sequence, ...filters },
    query: { page }
  });
  return response.data;
};

export const postRegexQuery = async (
  regex: string,
  filters?: TextQueryFilterParams,
  page: number = 1
): Promise<WithPagination<SearchPeptide> & { context: { params: TextQueryResponseParams } }> => {
  const response = await client.post<ApiResponse<WithPagination<SearchPeptide> & { context: { params: TextQueryResponseParams } }>>('/search/text-query', {
    data: { regex, ...filters },
    query: { page }
  });
  return response.data;
};

export const postTextQueryExportPayload = async (sequence: string, filters?: TextQueryFilterParams): Promise<string> => {
  const response = await client.post<ApiResponse<string>>('/search/text-query/export', {
    data: { sequence, ...filters }
  });
  return response.data;
};

export const postRegexQueryExportPayload = async (regex: string, filters?: TextQueryFilterParams): Promise<string> => {
  const response = await client.post<ApiResponse<string>>('/search/text-query/export', {
    data: { regex, ...filters }
  });
  return response.data;
};
