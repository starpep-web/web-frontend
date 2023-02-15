import axios from 'axios';

export const getMetadataSuggestions = async (metadataName: string, name: string): Promise<string[]> => {
  try {
    const response = await axios.get(`/api/search/metadata/suggestions/${metadataName}`, {
      params: {
        name
      }
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getDatabaseSuggestions = (name: string) => {
  return getMetadataSuggestions('database', name);
};

export const getCTerminusSuggestions = (name: string) => {
  return getMetadataSuggestions('cterminus', name);
};

export const getNTerminusSuggestions = (name: string) => {
  return getMetadataSuggestions('nterminus', name);
};

export const getFunctionSuggestions = (name: string) => {
  return getMetadataSuggestions('function', name);
};

export const getOriginSuggestions = (name: string) => {
  return getMetadataSuggestions('origin', name);
};

export const getTargetSuggestions = (name: string) => {
  return getMetadataSuggestions('target', name);
};

export const getUnusualAASuggestions = (name: string) => {
  return getMetadataSuggestions('unusualaa', name);
};

export const getCrossRefSuggestions = (name: string) => {
  return getMetadataSuggestions('crossref', name);
};
