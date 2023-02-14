import React from 'react';
import { Heading, Block, Notification } from 'react-bulma-components';
import PeptideMetadataBlock from './PeptideMetadataBlock';
import { PeptideMetadata as PeptideMetadataType, RelationshipLabel } from '@lib/models/peptide';

interface Props {
  metadata: PeptideMetadataType
}

const PeptideMetadata: React.FC<Props> = ({ metadata }) => {
  return (
    <Block my={3}>
      <Notification color="gray">
        <Heading size={3}>
          Peptide Metadata
        </Heading>

        {
          Object.entries(metadata).map(([title, values]) => (
            <PeptideMetadataBlock key={title} title={title as RelationshipLabel} values={values} />
          ))
        }
      </Notification>
    </Block>
  );
};

export default PeptideMetadata;
