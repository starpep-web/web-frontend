import React from 'react';
import { Block } from 'react-bulma-components';
import { StepStatus } from '@components/common/stepStatus';
import { SearchExportResource } from '@lib/models/export';

const resourceInProgressTexts: Record<SearchExportResource, string> = {
  fasta: 'Merging sequences...',
  metadata: 'Merging metadata...',
  attributes: 'Merging features...',
  esmMean: 'Merging ESM-mean embeddings...',
  iFeatureAac: 'Merging iFeature-AAC-20 embeddings...',
  iFeatureDpc: 'Merging iFeature-DPC-400 embeddings...',
  pdb: 'Copying 3D structure PDB files...'
};

const resourceDoneTexts: Record<SearchExportResource, string> = {
  fasta: 'Merged sequences.',
  metadata: 'Merged metadata.',
  attributes: 'Merged features.',
  esmMean: 'Merged ESM-mean embeddings.',
  iFeatureAac: 'Merged iFeature-AAC-20 embeddings.',
  iFeatureDpc: 'Merged iFeature-DPC-400 embeddings.',
  pdb: 'Copied 3D structure PDB files.'
};

interface Props {
  done: SearchExportResource[]
  exported: SearchExportResource[]
}

const SearchExportSteps: React.FC<Props> = ({ done, exported }) => {
  return (
    <Block>
      {
        exported.map((resource) => {
          const isDone = done.includes(resource);
          const textMap = isDone ? resourceDoneTexts : resourceInProgressTexts;

          return (
            <StepStatus
              key={resource}
              status={isDone ? 'success' : 'in-progress'}
              text={textMap[resource]}
            />
          );
        })
      }

      <StepStatus
        status="in-progress"
        text="Creating ZIP archive..."
      />
    </Block>
  );
};

export default SearchExportSteps;
