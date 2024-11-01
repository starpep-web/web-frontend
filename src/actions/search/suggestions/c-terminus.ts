'use server';
import { getCTerminusSuggestions } from '@lib/services/api/endpoints/search';

export const getCTerminusSuggestionsAction: typeof getCTerminusSuggestions = (...args) => {
  return getCTerminusSuggestions(...args);
};
