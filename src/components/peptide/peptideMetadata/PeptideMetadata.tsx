import React from 'react';
import clsx from 'clsx';
import Alert from 'react-bootstrap/Alert';
import { PeptideMetadata as PeptideMetadataType } from '@lib/services/api/models/peptide';
import { MultiColumnList } from '@components/common/multiColumnList';
import { getFriendlyMetadataName, MetadataLabel } from './shared';
import styles from './PeptideMetadata.module.scss';

interface Props {
  metadata: PeptideMetadataType
}

export const PeptideMetadata: React.FC<Props> = ({ metadata }) => {
  return (
    <div className="my-3">
      <Alert variant="secondary">
        <h2 className="mb-4">
          Peptide Metadata
        </h2>

        {
          Object.entries(metadata).map(([title, values]) => (
            <div key={title} className="mb-5">
              <h3 className={clsx(styles.metadataSubtitle, 'mb-2')}>
                {getFriendlyMetadataName(title as MetadataLabel)}
              </h3>

              <MultiColumnList ordered={false} items={values} />
            </div>
          ))
        }
      </Alert>
    </div>
  );
};
