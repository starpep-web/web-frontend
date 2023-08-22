import React from 'react';
import Link from 'next/link';
import { Block } from 'react-bulma-components';
import { MultiColumnList } from '@components/common/multiColumnList';
import { SearchExportFormData, SearchExportResource } from '@lib/models/export';
import { joinWithDifferentLastSeparator } from '@lib/utils/array';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';

const resourceFriendlyNames: Record<SearchExportResource, string> = {
  fasta: 'sequences FASTA file',
  metadata: 'metadata CSV',
  attributes: 'attributes CSV',
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
    <Block>
      <p>
        Your exported package contains the {exportedResourcesText} for the following {total} peptides:
      </p>

      <Block mt={5} backgroundColor="gray">
        <MultiColumnList
          ordered={false}
          items={peptideIds}
          itemComponent={({ item }) => (
            <Link href={DYNAMIC_ROUTES.peptide(item)}>
              {item}
            </Link>
          )}
        />
      </Block>
    </Block>
  );
};

export default ExportedResourcesInformation;
