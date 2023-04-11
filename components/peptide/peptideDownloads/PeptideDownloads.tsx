import React from 'react';
import { Block, Notification, Heading, Button } from 'react-bulma-components';
import { getPeptidePdbDownloadUrl } from '@lib/services/downloadServer/peptide';

interface Props {
  id: string
}

const PeptideDownloads: React.FC<Props> = ({ id }) => {
  return (
    <Block>
      <Notification color="gray">
        <Heading size={3}>
          Peptide Downloads
        </Heading>

        <Block>
          <Button color="primary" renderAs="a" href={getPeptidePdbDownloadUrl(id)} target="_blank">
            Download This Peptide's .pdb
          </Button>
        </Block>
      </Notification>
    </Block>
  );
};

export default PeptideDownloads;
