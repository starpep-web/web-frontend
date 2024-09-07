'use server';
import { getAttributeScatter } from '@lib/services/api/endpoints/statistics';

export const getAttributeScatterAction: typeof getAttributeScatter = (...args) => {
  return getAttributeScatter(...args);
};
