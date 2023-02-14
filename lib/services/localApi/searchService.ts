import axios from 'axios';

export const getDatabaseSuggestions = async (name: string): Promise<string[]> => {
  const response = await axios.get('/api/search/metadata/suggestions/database', {
    params: {
      name
    }
  });

  return response.data.data;
};
