import React, { useState } from 'react';
import Controls from './Controls';
import Toggle from './Toggle';
import { AtomStyle, ColorScheme } from '@components/pdb/pdbViewer/types';

interface Props {
  defaultStyle?: AtomStyle
  defaultColor?: ColorScheme

  onStyleChange?: (style: AtomStyle) => void
  onColorChange?: (color: ColorScheme) => void
  onSpinToggle?: () => void
}

const ControlsOverlay: React.FC<Props> = ({
  defaultStyle,
  defaultColor,
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
      defaultStyle={defaultStyle}
      defaultColor={defaultColor}
      onStyleChange={onStyleChange}
      onColorChange={onColorChange}
      onSpinToggle={onSpinToggle}
      onClose={handleHideControls}
    />
  ) : (
    <Toggle onToggle={handleShowControls} />
  );
};

export default ControlsOverlay;
