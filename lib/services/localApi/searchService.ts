import { http } from './apiService';
import { createPagination, WithPagination } from '@lib/utils/pagination';

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
