'use server';
import { postSingleQuerySearch } from '@lib/services/bioApi/endpoints/search';

export const postSingleQuerySearchAction: typeof postSingleQuerySearch = (...args) => {
  return postSingleQuerySearch(...args);
};
