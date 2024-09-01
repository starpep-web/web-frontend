'use server';
import { getTargetSuggestions } from '@lib/services/api/endpoints/search';

export const getTargetSuggestionsAction: typeof getTargetSuggestions = (...args) => {
  return getTargetSuggestions(...args);
};
