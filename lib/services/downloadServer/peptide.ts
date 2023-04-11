import axios from 'axios';
import { DOWNLOAD_WEBSITE_URL } from '@lib/config';

export const getPeptidePdbDownloadUrl = (starPepId: string) => {
  return `${DOWNLOAD_WEBSITE_URL}/pdb/${starPepId}.pdb`;
};

export const getPeptidePdbContent = async (starPepId: string): Promise<string> => {
  try {
    return (await axios.get(getPeptidePdbDownloadUrl(starPepId))).data;
  } catch (error) {
    console.error(error);
    return '';
  }
};
