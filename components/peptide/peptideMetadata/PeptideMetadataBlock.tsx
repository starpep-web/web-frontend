import React from 'react';
import { Heading, Block } from 'react-bulma-components';
import { MultiColumnList } from '@components/common/multiColumnList';
import { getFriendlyRelationshipLabel, RelationshipLabel } from '@lib/models/peptide';

interface Props {
  title: RelationshipLabel
  values: string[]
}

const PeptideMetadataBlock: React.FC<Props> = ({ title, values }) => {
  return (
    <Block>
      <Heading size={4}>
        • {getFriendlyRelationshipLabel(title)}
      </Heading>

      <Block>
        <MultiColumnList ordered={false} items={values} />
      </Block>
    </Block>
  );
};

export default PeptideMetadataBlock;
