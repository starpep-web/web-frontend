'use server';
import { getAttributeHistogram } from '@lib/services/api/endpoints/statistics';

export const getAttributeHistogramAction: typeof getAttributeHistogram = (...args) => {
  return getAttributeHistogram(...args);
};
