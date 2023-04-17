import React, { Fragment } from 'react';
import { Button, Heading, Notification } from 'react-bulma-components';
import { DOWNLOADS_PDB_ARCHIVE, DOWNLOADS_FASTA_ARCHIVE, DOWNLOADS_DB_ARCHIVES, DOWNLOADS_FULL_FASTA, DOWNLOADS_FULL_METADATA_CSV } from '@lib/constants/site';
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
            PDB Archive
          </Button>

          <Button color="primary" renderAs="a" href={DOWNLOADS_FASTA_ARCHIVE} target="_blank">
            FASTA Archive
          </Button>
        </div>
      </Notification>

      <Notification color="gray">
        <Heading size={3}>
          Full Files
        </Heading>

        <div className={styles.buttonsContainer}>
          <Button color="primary" renderAs="a" href={DOWNLOADS_FULL_FASTA} target="_blank">
            Full FASTA
          </Button>

          <Button color="primary" renderAs="a" href={DOWNLOADS_FULL_METADATA_CSV} target="_blank">
            Full Metadata CSV
          </Button>
        </div>
      </Notification>

      <Notification color="gray">
        <Heading size={3}>
          Database
        </Heading>

        <div className={styles.buttonsContainer}>
          {
            Object.entries(DOWNLOADS_DB_ARCHIVES).map(([version, url], idx) => (
              <Button key={idx} color="primary" renderAs="a" href={url} target="_blank">
                Neo4j Database ({version})
              </Button>
            ))
          }
        </div>
      </Notification>
    </Fragment>
  );
};

export default ApplicationDownloads;
