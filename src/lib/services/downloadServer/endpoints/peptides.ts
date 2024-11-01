import { client } from '@lib/services/downloadServer/client';

export const getPeptidePdbContent = async (starPepId: string): Promise<string> => {
  try {
    return await client.get(`/peptides/pdb/${starPepId}.pdb`);
  } catch (error) {
    console.error(error);
    return '';
  }
};
