'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { PdbViewer, AtomStyle, ColorScheme } from '@components/visualization/pdbViewer';
import { ControlsOverlay } from '@components/visualization/overlays/controlsOverlay';
import { FullScreenOverlay } from '@components/visualization/overlays/fullScreenOverlay';
import { ExportOverlay } from '@components/visualization/overlays/exportOverlay';
import { InteractivityOverlay } from '@components/visualization/overlays/interactivityOverlay';
import { useExport } from '@components/hooks/useExport';
import { Peptide } from '@lib/services/api/models/peptide';

interface Props {
  peptide: Peptide
  pdb: string

  width?: string | number
  height?: string | number
}

export const PeptideViewer: React.FC<Props> = ({ pdb, peptide, width, height }) => {
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
      className={clsx(fullScreen && 'full-screen')}
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
        style={style}
        onStyleChange={setStyle}
        color={color}
        onColorChange={setColor}
        onSpinToggle={handleToggleSpin}
      />
      <FullScreenOverlay fullScreen={fullScreen} onToggle={handleFullScreenToggle} />
      <InteractivityOverlay enabled={enableInteraction} onToggle={handleInteractionToggle} />
      <ExportOverlay onClick={exportRef} />
    </PdbViewer>
  );
};
