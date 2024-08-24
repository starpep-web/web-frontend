import React from 'react';
import { PeptideGraph } from '@components/peptide/peptideGraph';
import { PeptideViewer } from '@components/peptide/peptideViewer';
import { Peptide } from '@lib/services/api/models/peptide';

interface Props {
  peptide: Peptide
  pdbString: string
}

export const PeptideVisualization: React.FC<Props> = ({ peptide, pdbString }) => {
  const height = 400;

  return (
    <div className="d-flex flex-lg-row flex-column gap-3 mb-5">
      <PeptideGraph peptide={peptide} width="100%" height={height} />
      <PeptideViewer peptide={peptide} pdb={pdbString} width="100%" height={height} />
    </div>
  );
};
