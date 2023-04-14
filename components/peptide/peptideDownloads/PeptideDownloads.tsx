import React from 'react';
import { Block, Notification, Heading, Button } from 'react-bulma-components';
import { getPublicPeptidePdbDownloadUrl, getPublicPeptideFastaDownloadUrl } from '@lib/services/downloadServer/peptide';
import styles from './PeptideDownloads.module.scss';

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

        <div className={styles.buttonsContainer}>
          <Button color="primary" renderAs="a" href={getPublicPeptidePdbDownloadUrl(id)} target="_blank">
            3D Structure (.pdb)
          </Button>

          <Button color="primary" renderAs="a" href={getPublicPeptideFastaDownloadUrl(id)} target="_blank">
            Sequence (.fasta)
          </Button>
        </div>
      </Notification>
    </Block>
  );
};

export default PeptideDownloads;
