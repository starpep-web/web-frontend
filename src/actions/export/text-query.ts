'use server';
import { postTextQueryExport } from '@lib/services/bioApi/endpoints/export';

export const postTextQueryExportAction: typeof postTextQueryExport = (...args) => {
  return postTextQueryExport(...args);
};
