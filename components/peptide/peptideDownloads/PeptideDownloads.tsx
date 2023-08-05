import React from 'react';
import { Block, Notification, Heading, Button } from 'react-bulma-components';
import {
  getPublicPeptidePdbDownloadUrl,
  getPublicPeptideFastaDownloadUrl,
  getPublicPeptideMetadataCsvDownloadUrl,
  getPublicPeptideAttributesCsvDownloadUrl,
  getPublicPeptideEmbeddingEsmMeanDownloadUrl,
  getPublicPeptideEmbeddingIFeatureAacDownloadUrl,
  getPublicPeptideEmbeddingIFeatureDpcDownloadUrl
} from '@lib/services/downloadServer/peptide';
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

          <Button color="primary" renderAs="a" href={getPublicPeptideMetadataCsvDownloadUrl(id)} target="_blank">
            Metadata (.csv)
          </Button>

          <Button color="primary" renderAs="a" href={getPublicPeptideAttributesCsvDownloadUrl(id)} target="_blank">
            Attributes (.csv)
          </Button>

          <Button color="primary" renderAs="a" href={getPublicPeptideEmbeddingEsmMeanDownloadUrl(id)} target="_blank">
            ESM-mean Embedding (.csv)
          </Button>

          <Button color="primary" renderAs="a" href={getPublicPeptideEmbeddingIFeatureAacDownloadUrl(id)} target="_blank">
            iFeature AAC-20 Embedding (.csv)
          </Button>

          <Button color="primary" renderAs="a" href={getPublicPeptideEmbeddingIFeatureDpcDownloadUrl(id)} target="_blank">
            iFeature DPC-400 Embedding (.csv)
          </Button>
        </div>
      </Notification>
    </Block>
  );
};

export default PeptideDownloads;
