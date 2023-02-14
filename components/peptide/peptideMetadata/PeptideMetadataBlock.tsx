import React from 'react';
import { Heading, Block } from 'react-bulma-components';
import { getFriendlyRelationshipLabel, RelationshipLabel } from '@lib/models/peptide';

interface Props {
  title: RelationshipLabel
  values: string[]
}

const PeptideMetadataBlock: React.FC<Props> = ({ title, values }) => {
  console.log(title);
  return (
    <Block>
      <Heading size={4}>
        • {getFriendlyRelationshipLabel(title)}
      </Heading>

      <Block>
        {values.toString()}
      </Block>
    </Block>
  );
};

export default PeptideMetadataBlock;
