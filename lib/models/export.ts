export type SearchExportType = 'fasta' | 'metadata' | 'attributes' | 'esmMean' | 'iFeatureAac' | 'iFeatureDpc' | 'pdb';

export type SearchExportFormData = {
  [k in SearchExportType]: boolean
};

export const isSearchExportFormDataValid = (data: SearchExportFormData | null): data is SearchExportFormData => {
  return data ? Object.values(data).some(Boolean) : false;
};

export const defaultExportFormData: SearchExportFormData = {
  fasta: true,
  metadata: false,
  attributes: false,
  esmMean: false,
  iFeatureAac: false,
  iFeatureDpc: false,
  pdb: false
};
