import React, { useState } from 'react';
import { PdbViewer } from '@components/pdb/pdbViewer';
import { ControlsOverlay } from '@components/pdb/controlsOverlay';
import { AtomStyle, ColorScheme } from '@components/pdb/pdbViewer/types';
import { FullScreenOverlay } from '@components/genericOverlays/fullScreenOverlay';
import { ExportOverlay } from '@components/genericOverlays/exportOverlay';
import { useExport } from '@components/hooks/export';
import clsx from 'clsx';
import { FullPeptide } from '@lib/models/peptide';
import { InteractivityOverlay } from '@components/genericOverlays/interactivityOverlay';

interface Props {
  peptide: FullPeptide
  pdb: string

  width?: string | number
  height?: string | number
}

const PeptideViewer: React.FC<Props> = ({ pdb, peptide, width, height }) => {
  const [style, setStyle] = useState<AtomStyle>('cartoon');
  const [color, setColor] = useState<ColorScheme>('ssJmol');
  const [spin, setSpin] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [enableInteraction, setEnableInteraction] = useState<boolean>(false);
  const [ref, exportRef] = useExport<HTMLDivElement>(`Structure-${peptide.id}`);

  const handleToggleSpin = () => {
    setSpin(!spin);
  };

  const handleFullScreenToggle = () => {
    setFullScreen(!fullScreen);
  };

  const handleInteractionToggle = () => {
    setEnableInteraction(!enableInteraction);
  };

  return (
    <PdbViewer
      className={clsx({ 'full-screen': fullScreen })}
      pdb={pdb}
      width={width}
      height={height}
      style={style}
      color={color}
      spin={spin}
      ref={ref}
      disableMouse={!enableInteraction}
    >
      <ControlsOverlay
        defaultStyle={style}
        onStyleChange={setStyle}
        defaultColor={color}
        onColorChange={setColor}
        onSpinToggle={handleToggleSpin}
      />
      <FullScreenOverlay fullScreen={fullScreen} onToggle={handleFullScreenToggle} />
      <InteractivityOverlay enabled={enableInteraction} onToggle={handleInteractionToggle} />
      <ExportOverlay onClick={exportRef} />
    </PdbViewer>
  );
};

export default PeptideViewer;
