import { client } from '@lib/services/api/client';
import { ApiResponse } from '@lib/services/api/models/api';
import { Peptide } from '@lib/services/api/models/peptide';

export const getPeptideById = async (id: string): Promise<Peptide | null> => {
  try {
    const response = await client.get<ApiResponse<Peptide>>('/peptides', {
      query: { id }
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getPeptideBySequence = async (seq: string): Promise<Peptide | null> => {
  try {
    const response = await client.get<ApiResponse<Peptide>>('/peptides', {
      query: { seq }
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
