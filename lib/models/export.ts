export type SearchExportType = 'fasta' | 'metadata' | 'attributes' | 'esmMean' | 'iFeatureAac' | 'iFeatureDpc' | 'pdb';

export type SearchExportFormData = {
  [k in SearchExportType]: boolean
};
