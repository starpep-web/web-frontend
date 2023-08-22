export type SearchExportResource = 'fasta' | 'metadata' | 'attributes' | 'esmMean' | 'iFeatureAac' | 'iFeatureDpc' | 'pdb';

export type SearchExportFormData = {
  [k in SearchExportResource]: boolean
};

export const isSearchExportFormDataValid = (data: SearchExportFormData | null): data is SearchExportFormData => {
  return data ? Object.values(data).some(Boolean) : false;
};

export const DEFAULT_EXPORT_FORM_DATA: SearchExportFormData = {
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
export const approximateBytesForItemPerPeptide: Record<SearchExportResource, number> = {
  fasta: 44,
  metadata: 167,
  attributes: 172,
  esmMean: 26464,
  iFeatureAac: 145,
  iFeatureDpc: 1019,
  pdb: 23400
};

const SEARCH_TYPES = ['text', 'single', 'multi'] as const;
export type SearchType = typeof SEARCH_TYPES[number];

export const isSearchTypeValid = (type?: string): type is SearchType => {
  return SEARCH_TYPES.includes(type as SearchType);
};

export type ExportPayloadData = string;

export interface ExportRequestPayload {
  type: SearchType
  form: SearchExportFormData
  data: ExportPayloadData
}

export type WithExportPayloadData<T> = T & {
  exportPayloadData: ExportPayloadData
};

export interface ExportResult {
  total: number
  peptideIds: string[]
  form: SearchExportFormData
  done: SearchExportResource[]
}
