'use server';
import { getDatabaseSuggestions } from '@lib/services/api/endpoints/search';

export const getDatabaseSuggestionsAction: typeof getDatabaseSuggestions = (...args) => {
  return getDatabaseSuggestions(...args);
};
