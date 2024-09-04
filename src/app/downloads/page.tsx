import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import { DownloadsCard } from '@components/downloads/downloadsCard';
import {
  DOWNLOADS_DB_ARCHIVES,
  DOWNLOADS_FASTA_BY_DB,
  DOWNLOADS_FASTA_BY_DB_ARCHIVE,
  DOWNLOADS_FULL_ATTRIBUTES_CSV,
  DOWNLOADS_FULL_EMBEDDINGS,
  DOWNLOADS_FULL_METADATA_CSV,
  DOWNLOADS_PDB_ARCHIVE,
  DOWNLOADS_STARPEP_FASTA
} from '@lib/constants/downloads';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.downloads, {
    pageTitle: 'Downloads'
  });
};

const DownloadsPage = () => {
  return (
    <Fragment>
      <DownloadsCard className="mb-4" title="Peptide Archives">
        <Button variant="primary" as="a" href={DOWNLOADS_PDB_ARCHIVE} target="_blank">
          Complete PDB Archive (.zip)
        </Button>
      </DownloadsCard>

      <DownloadsCard className="mb-4" title="Full Files">
        <Button variant="primary" as="a" href={DOWNLOADS_FULL_METADATA_CSV} target="_blank">
          Full Metadata (.csv)
        </Button>

        <Button variant="primary" as="a" href={DOWNLOADS_FULL_ATTRIBUTES_CSV} target="_blank">
          Full Attributes (.csv)
        </Button>

        {
          Object.entries(DOWNLOADS_FULL_EMBEDDINGS).map(([embeddingName, url], idx) => (
            <Button key={idx} variant="primary" as="a" href={url} target="_blank">
              Full Embedding [{embeddingName}] (.csv)
            </Button>
          ))
        }
      </DownloadsCard>

      <DownloadsCard className="mb-4" title="StarPep FASTA Files">
        {
          Object.entries(DOWNLOADS_STARPEP_FASTA).map(([version, url], idx) => (
            <Button key={idx} variant="primary" as="a" href={url} target="_blank">
              StarPep FASTA - {version} (.fasta)
            </Button>
          ))
        }
      </DownloadsCard>

      <DownloadsCard className="mb-4" title="FASTA Files by Database">
        <Button variant="primary" as="a" href={DOWNLOADS_FASTA_BY_DB_ARCHIVE} target="_blank">
          Complete FASTA by Database Archive (.zip)
        </Button>

        {
          Object.entries(DOWNLOADS_FASTA_BY_DB).map(([db, urlsObject], idx) => (
            <div key={idx} className="mt-4">
              <h5 className="mb-3">
                FASTA Files for Database: {db}
              </h5>

              <div className="d-flex flex-column gap-3">
                {
                  Object.entries(urlsObject).map(([version, url], idx) => (
                    <Button key={idx} variant="primary" as="a" href={url} target="_blank">
                      {db} FASTA - {version} (.fasta)
                    </Button>
                  ))
                }
              </div>
            </div>
          ))
        }
      </DownloadsCard>

      <DownloadsCard className="mb-4" title="Neo4j Database">
        {
          Object.entries(DOWNLOADS_DB_ARCHIVES).map(([version, url], idx) => (
            <Button key={idx} variant="primary" as="a" href={url} target="_blank">
              Neo4j (3.5) Database [{version}] (.zip)
            </Button>
          ))
        }
      </DownloadsCard>
    </Fragment>
  );
};

export default DownloadsPage;
