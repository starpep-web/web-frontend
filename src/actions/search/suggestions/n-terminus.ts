'use server';
import { getNTerminusSuggestions } from '@lib/services/api/endpoints/search';

export const getNTerminusSuggestionsAction: typeof getNTerminusSuggestions = (...args) => {
  return getNTerminusSuggestions(...args);
};
