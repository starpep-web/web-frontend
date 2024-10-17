'use server';
import { postSingleQueryExport } from '@lib/services/bioApi/endpoints/export';

export const postSingleQueryExportAction: typeof postSingleQueryExport = (...args) => {
  return postSingleQueryExport(...args);
};
