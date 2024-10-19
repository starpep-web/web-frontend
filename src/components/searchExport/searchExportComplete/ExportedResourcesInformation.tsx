import React from 'react';
import Link from 'next/link';
import { MultiColumnList } from '@components/common/multiColumnList';
import { SearchExportFormData, SearchExportResource } from '@lib/services/bioApi/models/export';
import { joinWithDifferentLastSeparator } from '@lib/utils/array';
import { RouteDefs } from '@lib/constants/routes';

const resourceFriendlyNames: Record<SearchExportResource, string> = {
  fasta: 'sequences FASTA file',
  metadata: 'metadata CSV',
  attributes: 'features CSV',
  esmMean: 'ESM-mean embeddings CSV',
  iFeatureAac: 'iFeature-AAC-20 embeddings CSV',
  iFeatureDpc: 'iFeature-DPC-400 embeddings CSV',
  pdb: '3D structure PDB files'
};

interface Props {
  form: SearchExportFormData
  peptideIds: string[]
  total: number
}

const ExportedResourcesInformation: React.FC<Props> = ({ form, peptideIds, total }) => {
  const exportedResourceFriendlyTexts = Object.entries(form)
    .filter(([_, v]) => v)
    .map(([k]) => resourceFriendlyNames[k as SearchExportResource]);

  const exportedResourcesText = joinWithDifferentLastSeparator(exportedResourceFriendlyTexts, ', ', ', and ');

  return (
    <div>
      <p className="mb-0">
        Your exported package contains the <strong>{exportedResourcesText}</strong> for the following <strong>{total}</strong> peptides:
      </p>

      <div className="mt-4 bg-light p-4 rounded-2">
        <MultiColumnList
          className="mb-0"
          ordered={false}
          items={peptideIds}
          itemComponent={({ children }) => (
            <Link href={RouteDefs.peptide(children)}>
              {children}
            </Link>
          )}
        />
      </div>
    </div>
  );
};

export default ExportedResourcesInformation;
