import { NEXT_PUBLIC_DOWNLOADS_URL } from '@lib/config/app';

export const makePeptidePdbDownloadUrl = (starPepId: string) => {
  return `${NEXT_PUBLIC_DOWNLOADS_URL}/peptides/pdb/${starPepId}.pdb`;
};

export const makePeptideFastaDownloadUrl = (starPepId: string) => {
  return `${NEXT_PUBLIC_DOWNLOADS_URL}/peptides/fasta/${starPepId}.fasta`;
};

export const makePeptideMetadataCsvDownloadUrl = (starPepId: string) => {
  return `${NEXT_PUBLIC_DOWNLOADS_URL}/peptides/csv/metadata/${starPepId}.csv`;
};

export const makePeptideAttributesCsvDownloadUrl = (starPepId: string) => {
  return `${NEXT_PUBLIC_DOWNLOADS_URL}/peptides/csv/attributes/${starPepId}.csv`;
};

export const makePeptidePdbPreviewImageUrl = (starPepId: string) => {
  return `${NEXT_PUBLIC_DOWNLOADS_URL}/peptides/previews/pdb/${starPepId}.png`;
};

export const makePeptideEmbeddingEsmMeanDownloadUrl = (starPepId: string) => {
  return `${NEXT_PUBLIC_DOWNLOADS_URL}/peptides/csv/embeddings/esm-mean/${starPepId}.csv`;
};

export const makePeptideEmbeddingIFeatureAacDownloadUrl = (starPepId: string) => {
  return `${NEXT_PUBLIC_DOWNLOADS_URL}/peptides/csv/embeddings/ifeature-aac-20/${starPepId}.csv`;
};

export const makePeptideEmbeddingIFeatureDpcDownloadUrl = (starPepId: string) => {
  return `${NEXT_PUBLIC_DOWNLOADS_URL}/peptides/csv/embeddings/ifeature-dpc-400/${starPepId}.csv`;
};
