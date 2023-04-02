import React from 'react';
import { Block, Notification, Heading } from 'react-bulma-components';
import { Peptide } from '@lib/models/peptide';

interface Props extends Peptide {

}

const PeptideInfo: React.FC<Props> = ({ id, sequence, length }) => {
  return (
    <Block>
      <Notification color="gray">
        <Heading size={3}>
          Peptide Information
        </Heading>

        <Block>
          <p>
            <strong>ID: </strong> {id}
          </p>
          <p>
            <strong>Sequence: </strong> {sequence}
          </p>
          <p>
            <strong>Length: </strong> {length}
          </p>
        </Block>
      </Notification>
    </Block>
  );
};

export default PeptideInfo;
