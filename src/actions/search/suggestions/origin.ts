'use server';
import { getOriginSuggestions } from '@lib/services/api/endpoints/search';

export const getOriginSuggestionsAction: typeof getOriginSuggestions = (...args) => {
  return getOriginSuggestions(...args);
};
