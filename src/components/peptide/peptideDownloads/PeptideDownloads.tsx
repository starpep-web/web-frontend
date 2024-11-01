import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import {
  makePeptidePdbDownloadUrl,
  makePeptideFastaDownloadUrl,
  makePeptideMetadataCsvDownloadUrl,
  makePeptideAttributesCsvDownloadUrl,
  makePeptideEmbeddingEsmMeanDownloadUrl,
  makePeptideEmbeddingIFeatureAacDownloadUrl,
  makePeptideEmbeddingIFeatureDpcDownloadUrl
} from '@lib/services/downloadServer/urls/peptides';

interface Props {
  id: string
}

export const PeptideDownloads: React.FC<Props> = ({ id }) => {
  return (
    <div>
      <Alert variant="secondary">
        <h2 className="mb-4">
          Peptide Downloads
        </h2>

        <div className="d-flex gap-3 flex-column flex-md-row flex-wrap">
          <Button variant="primary" as="a" href={makePeptidePdbDownloadUrl(id)} target="_blank">
            3D Structure (.pdb)
          </Button>

          <Button variant="primary" as="a" href={makePeptideFastaDownloadUrl(id)} target="_blank">
            Sequence (.fasta)
          </Button>

          <Button variant="primary" as="a" href={makePeptideMetadataCsvDownloadUrl(id)} target="_blank">
            Metadata (.csv)
          </Button>

          <Button variant="primary" as="a" href={makePeptideAttributesCsvDownloadUrl(id)} target="_blank">
            Attributes (.csv)
          </Button>

          <Button variant="primary" as="a" href={makePeptideEmbeddingEsmMeanDownloadUrl(id)} target="_blank">
            ESM-mean Embedding (.csv)
          </Button>

          <Button variant="primary" as="a" href={makePeptideEmbeddingIFeatureAacDownloadUrl(id)} target="_blank">
            iFeature AAC-20 Embedding (.csv)
          </Button>

          <Button variant="primary" as="a" href={makePeptideEmbeddingIFeatureDpcDownloadUrl(id)} target="_blank">
            iFeature DPC-400 Embedding (.csv)
          </Button>
        </div>
      </Alert>
    </div>
  );
};
