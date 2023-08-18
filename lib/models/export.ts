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

// Computed by running the `du` command on the file/folder that contains all the data for a given item for the
// entire database and then multiplied by 512 / 45120.
export const approximateBytesForItemPerPeptide: Record<SearchExportType, number> = {
  fasta: 44,
  metadata: 167,
  attributes: 172,
  esmMean: 26464,
  iFeatureAac: 145,
  iFeatureDpc: 1019,
  pdb: 23400
};

export type SearchType = 'text' | 'single' | 'multi';

export interface ExportPayload {
  type: SearchType
  form: SearchExportFormData
  data: string
}
