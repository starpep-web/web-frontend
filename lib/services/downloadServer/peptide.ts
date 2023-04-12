import axios from 'axios';
import { PUBLIC_DOWNLOADS_URL, SERVER_DOWNLOADS_URL } from '@lib/config';

export const getPublicPeptidePdbDownloadUrl = (starPepId: string) => {
  return `${PUBLIC_DOWNLOADS_URL}/pdb/${starPepId}.pdb`;
};

export const getServerPeptidePdbDownloadUrl = (starPepId: string) => {
  return `${SERVER_DOWNLOADS_URL}/pdb/${starPepId}.pdb`;
};

export const getPeptidePdbContentFromServer = async (starPepId: string): Promise<string> => {
  try {
    return (await axios.get(getServerPeptidePdbDownloadUrl(starPepId))).data;
  } catch (error) {
    console.error(error);
    return '';
  }
};
