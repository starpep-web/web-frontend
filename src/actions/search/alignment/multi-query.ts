'use server';
import { postMultiQuerySearch } from '@lib/services/bioApi/endpoints/search';

export const postMultiQuerySearchAction: typeof postMultiQuerySearch = (...args) => {
  return postMultiQuerySearch(...args);
};
