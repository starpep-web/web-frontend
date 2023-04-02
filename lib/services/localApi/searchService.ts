import axios from 'axios';
import { createPagination, WithPagination } from '@lib/utils/pagination';

export const getMetadataSuggestions = async (metadataName: string, name: string, page: number): Promise<WithPagination<string[]>> => {
  try {
    const response = await axios.get(`/api/search/metadata/suggestions/${metadataName}`, {
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

export const getDatabaseSuggestions = (name: string, page = 1) => {
  return getMetadataSuggestions('database', name, page);
};

export const getCTerminusSuggestions = (name: string, page = 1) => {
  return getMetadataSuggestions('cterminus', name, page);
};

export const getNTerminusSuggestions = (name: string, page = 1) => {
  return getMetadataSuggestions('nterminus', name, page);
};

export const getFunctionSuggestions = (name: string, page = 1) => {
  return getMetadataSuggestions('function', name, page);
};

export const getOriginSuggestions = (name: string, page = 1) => {
  return getMetadataSuggestions('origin', name, page);
};

export const getTargetSuggestions = (name: string, page = 1) => {
  return getMetadataSuggestions('target', name, page);
};

export const getUnusualAASuggestions = (name: string, page = 1) => {
  return getMetadataSuggestions('unusualaa', name, page);
};

export const getCrossRefSuggestions = (name: string, page = 1) => {
  return getMetadataSuggestions('crossref', name, page);
};
