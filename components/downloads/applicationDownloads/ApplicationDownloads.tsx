import React, { Fragment } from 'react';
import { Button, Heading, Notification, Block } from 'react-bulma-components';
import {
  DOWNLOADS_PDB_ARCHIVE,
  DOWNLOADS_FASTA_BY_DB_ARCHIVE,
  DOWNLOADS_DB_ARCHIVES,
  DOWNLOADS_STARPEP_FASTA,
  DOWNLOADS_FULL_METADATA_CSV,
  DOWNLOADS_FASTA_BY_DB,
  DOWNLOADS_FULL_EMBEDDINGS
} from '@lib/constants/site';
import styles from './ApplicationDownloads.module.scss';

const ApplicationDownloads = () => {
  return (
    <Fragment>
      <Notification color="gray">
        <Heading size={3}>
          Peptide Archives
        </Heading>

        <div className={styles.buttonsContainer}>
          <Button color="primary" renderAs="a" href={DOWNLOADS_PDB_ARCHIVE} target="_blank">
            Complete PDB Archive (.zip)
          </Button>
        </div>
      </Notification>

      <Notification color="gray">
        <Heading size={3}>
          Full Files
        </Heading>

        <div className={styles.buttonsContainer}>
          <Button color="primary" renderAs="a" href={DOWNLOADS_FULL_METADATA_CSV} target="_blank">
            Full Metadata (.csv)
          </Button>

          {
            Object.entries(DOWNLOADS_FULL_EMBEDDINGS).map(([embeddingName, url], idx) => (
              <Button key={idx} color="primary" renderAs="a" href={url} target="_blank">
                Full Embedding [{embeddingName}] (.csv)
              </Button>
            ))
          }
        </div>
      </Notification>

      <Notification color="gray">
        <Heading size={3}>
          StarPep FASTA Files
        </Heading>

        <div className={styles.buttonsContainer}>
          {
            Object.entries(DOWNLOADS_STARPEP_FASTA).map(([version, url], idx) => (
              <Button key={idx} color="primary" renderAs="a" href={url} target="_blank">
                StarPep FASTA - {version} (.fasta)
              </Button>
            ))
          }
        </div>
      </Notification>

      <Notification color="gray">
        <Heading size={3}>
          FASTA Files by Database
        </Heading>

        <div className={styles.buttonsContainer}>
          <Button color="primary" renderAs="a" href={DOWNLOADS_FASTA_BY_DB_ARCHIVE} target="_blank">
            Complete FASTA by Database Archive (.zip)
          </Button>
        </div>

        {
          Object.entries(DOWNLOADS_FASTA_BY_DB).map(([db, urlsObject], idx) => (
            <Block key={idx} my={6}>
              <Heading size={5}>
                FASTA Files for Database: {db}
              </Heading>

              <div className={styles.buttonsContainer}>
                {
                  Object.entries(urlsObject).map(([version, url], idx) => (
                    <Button key={idx} color="primary" renderAs="a" href={url} target="_blank">
                      {db} FASTA - {version} (.fasta)
                    </Button>
                  ))
                }
              </div>
            </Block>
          ))
        }
      </Notification>

      <Notification color="gray">
        <Heading size={3}>
          Neo4j Database
        </Heading>

        <div className={styles.buttonsContainer}>
          {
            Object.entries(DOWNLOADS_DB_ARCHIVES).map(([version, url], idx) => (
              <Button key={idx} color="primary" renderAs="a" href={url} target="_blank">
                Neo4j (3.5) Database [{version}] (.zip)
              </Button>
            ))
          }
        </div>
      </Notification>
    </Fragment>
  );
};

export default ApplicationDownloads;
