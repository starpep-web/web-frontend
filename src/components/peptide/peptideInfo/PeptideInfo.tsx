import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { BasePeptide } from '@lib/services/api/models/peptide';

interface Props extends BasePeptide {

}

export const PeptideInfo: React.FC<Props> = ({ id, sequence, length }) => {
  return (
    <div>
      <Alert variant="secondary">
        <h2 className="mb-4">
          Peptide Information
        </h2>

        <div>
          <p className="mb-0">
            <strong>ID:</strong> {id}
          </p>
          <p className="mb-0">
            <strong>Sequence:</strong> {sequence}
          </p>
          <p className="mb-0">
            <strong>Length:</strong> {length}
          </p>
        </div>
      </Alert>
    </div>
  );
};
