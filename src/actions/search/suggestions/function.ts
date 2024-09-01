'use server';
import { getFunctionSuggestions } from '@lib/services/api/endpoints/search';

export const getFunctionSuggestionsAction: typeof getFunctionSuggestions = (...args) => {
  return getFunctionSuggestions(...args);
};
