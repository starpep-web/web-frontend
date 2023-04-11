import React, { useState } from 'react';
import { PdbViewer } from '@components/pdb/pdbViewer';
import { ControlsOverlay } from '@components/pdb/controlsOverlay';
import { AtomStyle, ColorScheme } from '@components/pdb/pdbViewer/types';

interface Props {
  pdb: string

  width?: string | number
  height?: string | number
}

const PeptideViewer: React.FC<Props> = ({ pdb, width, height }) => {
  const [style, setStyle] = useState<AtomStyle>('stick');
  const [color, setColor] = useState<ColorScheme>('default');
  const [spin, setSpin] = useState<boolean>(false);

  return (
    <PdbViewer pdb={pdb} width={width} height={height} style={style} color={color} spin={spin}>
      <ControlsOverlay
        defaultStyle={style}
        onStyleChange={setStyle}
        defaultColor={color}
        onColorChange={setColor}
        defaultSpin={spin}
        onSpinChange={setSpin}
      />
    </PdbViewer>
  );
};

export default PeptideViewer;
