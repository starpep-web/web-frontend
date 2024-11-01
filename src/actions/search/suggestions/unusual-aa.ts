'use server';
import { getUnusualAASuggestions } from '@lib/services/api/endpoints/search';

export const getUnusualAASuggestionsAction: typeof getUnusualAASuggestions = (...args) => {
  return getUnusualAASuggestions(...args);
};
