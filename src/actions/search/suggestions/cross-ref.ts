'use server';
import { getCrossRefSuggestions } from '@lib/services/api/endpoints/search';

export const getCrossRefSuggestionsAction: typeof getCrossRefSuggestions = (...args) => {
  return getCrossRefSuggestions(...args);
};
