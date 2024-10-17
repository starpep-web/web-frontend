'use server';
import { postMultiQueryExport } from '@lib/services/bioApi/endpoints/export';

export const postMultiQueryExportAction: typeof postMultiQueryExport = (...args) => {
  return postMultiQueryExport(...args);
};
