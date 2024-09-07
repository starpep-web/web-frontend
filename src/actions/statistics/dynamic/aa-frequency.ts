'use server';
import { getAminoAcidFrequency } from '@lib/services/api/endpoints/statistics';

export const getAminoAcidFrequencyAction: typeof getAminoAcidFrequency = (...args) => {
  return getAminoAcidFrequency(...args);
};
