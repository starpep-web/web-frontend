import React, { useState } from 'react';
import { AtomStyle, ColorScheme } from '@components/visualization/pdbViewer';
import { Controls } from './Controls';
import { Toggle } from './Toggle';

interface Props {
  style: AtomStyle
  color: ColorScheme

  onStyleChange?: (style: AtomStyle) => void
  onColorChange?: (color: ColorScheme) => void
  onSpinToggle?: () => void
}

export const ControlsOverlay: React.FC<Props> = ({
  style,
  color,
  onStyleChange,
  onColorChange,
  onSpinToggle
}) => {
  const [show, setShow] = useState<boolean>(false);

  const handleShowControls = () => {
    setShow(true);
  };

  const handleHideControls = () => {
    setShow(false);
  };

  return show ? (
    <Controls
      style={style}
      color={color}
      onStyleChange={onStyleChange}
      onColorChange={onColorChange}
      onSpinToggle={onSpinToggle}
      onClose={handleHideControls}
    />
  ) : (
    <Toggle onToggle={handleShowControls} />
  );
};
