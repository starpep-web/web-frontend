import React from 'react';
import { PdbViewer } from '@components/pdb/pdbViewer';
import { ControlsOverlay } from '@components/pdb/controlsOverlay';

interface Props {
  pdb: string

  width?: string | number
  height?: string | number
}

const PeptideViewer: React.FC<Props> = ({ pdb, width, height }) => {
  return (
    <PdbViewer pdb={pdb} width={width} height={height} spin>
      <ControlsOverlay />
    </PdbViewer>
  );
};

export default PeptideViewer;
