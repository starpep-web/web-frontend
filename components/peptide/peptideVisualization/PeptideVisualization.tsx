import React from 'react';
import { PeptideViewer } from '@components/pdb/peptideViewer';
import { PeptideGraph } from '@components/graphs/peptideGraph';
import { FullPeptide } from '@lib/models/peptide';
import styles from './PeptideVisualization.module.scss';

interface Props {
  peptide: FullPeptide
  pdbString: string
}

const PeptideVisualization: React.FC<Props> = ({ peptide, pdbString }) => {
  const height = 400;

  return (
    <div className={styles.visualizationContainer}>
      <PeptideGraph peptide={peptide} width="100%" height={height} />
      <PeptideViewer peptide={peptide} pdb={pdbString} width="100%" height={height} />
    </div>
  );
};

export default PeptideVisualization;
