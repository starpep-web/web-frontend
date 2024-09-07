import { client } from '@lib/services/api/client';
import { ApiResponse, WithPagination } from '@lib/services/api/models/api';
import { SearchPeptide } from '@lib/services/api/models/peptide';
import { TextQueryFiltersObject, TextQueryRequestPayload } from '@lib/services/api/models/search';

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

const createTextQueryPayload = (type: 'sequence' | 'regex', query: string, filters?: TextQueryFiltersObject): TextQueryRequestPayload => {
  const separator = ';';
  const data: TextQueryRequestPayload = {
    [type]: query
  };

  if (filters?.metadata) {
    data.metadata = filters.metadata.map((filter) => filter.join(separator));
  }
  if (filters?.attributes) {
    data.attributes = filters.attributes.map((filter) => filter.join(separator));
  }
  if (filters?.length) {
    data.length = filters.length.join(separator);
  }

  return data;
};

export const postTextQuery = async (sequence: string, filters?: TextQueryFiltersObject, page: number = 1): Promise<WithPagination<SearchPeptide>> => {
  const response = await client.post<ApiResponse<WithPagination<SearchPeptide>>>('/search/text-query', {
    data: createTextQueryPayload('sequence', sequence, filters),
    query: { page }
  });
  return response.data;
};

export const postRegexQuery = async (regex: string, filters?: TextQueryFiltersObject, page: number = 1): Promise<WithPagination<SearchPeptide>> => {
  const response = await client.post<ApiResponse<WithPagination<SearchPeptide>>>('/search/text-query', {
    data: createTextQueryPayload('regex', regex, filters),
    query: { page }
  });
  return response.data;
};

export const postTextQueryExportPayload = async (sequence: string, filters?: TextQueryFiltersObject): Promise<string> => {
  const response = await client.post<ApiResponse<string>>('/search/text-query/export', {
    data: createTextQueryPayload('sequence', sequence, filters)
  });
  return response.data;
};

export const postRegexQueryExportPayload = async (regex: string, filters?: TextQueryFiltersObject): Promise<string> => {
  const response = await client.post<ApiResponse<string>>('/search/text-query/export', {
    data: createTextQueryPayload('regex', regex, filters)
  });
  return response.data;
};
