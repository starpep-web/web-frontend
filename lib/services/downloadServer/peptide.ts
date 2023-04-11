import { DOWNLOAD_WEBSITE_URL } from '@lib/config';

export const getPeptidePdbDownloadUrl = (starPepId: string) => {
  return `${DOWNLOAD_WEBSITE_URL}/pdb/${starPepId}.pdb`;
};
