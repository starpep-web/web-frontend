import React from 'react';
import clsx from 'clsx';
import Button from 'react-bootstrap/Button';
import { Dropdown } from '@components/form/dropdown';
import ShapesIcon from '@assets/svg/icons/shapes-solid.svg';
import PaletteIcon from '@assets/svg/icons/palette-solid.svg';
import RotateIcon from '@assets/svg/icons/rotate-solid.svg';
import XIcon from '@assets/svg/icons/x-solid.svg';
import { AtomStyle, ColorScheme, ATOM_STYLES, COLOR_SCHEMES } from '@components/visualization/pdbViewer';
import styles from './ControlsOverlay.module.scss';

const sortedStyles: AtomStyle[] = ATOM_STYLES.map((s) => s).sort((a, b) => a.localeCompare(b));
const sortedColors: ColorScheme[] = COLOR_SCHEMES.map((s) => s).sort((a, b) => a.localeCompare(b));

interface Props {
  style: AtomStyle
  color: ColorScheme

  onStyleChange?: (style: AtomStyle) => void
  onColorChange?: (color: ColorScheme) => void
  onSpinToggle?: () => void
  onClose?: () => void
}

export const Controls: React.FC<Props> = ({
  style,
  color,
  onStyleChange,
  onColorChange,
  onSpinToggle,
  onClose
}) => {
  const handleStyleChange = (value: AtomStyle) => {
    onStyleChange?.(value);
  };

  const handleColorChange = (value: ColorScheme) => {
    onColorChange?.(value);
  };

  const handleSpinChange = () => {
    onSpinToggle?.();
  };

  const handleCloseClick = () => {
    onClose?.();
  };

  return (
    <div className={styles.controlsOverlay}>
      <div className={styles.control}>
        <span className={styles.controlLabel}>
          Style
        </span>

        <Dropdown
          className={styles.optionsDropdown}
          value={style}
          onChange={handleStyleChange}
          options={sortedStyles}
          icon={ShapesIcon}
        />
      </div>

      <div className={styles.control}>
        <span className={styles.controlLabel}>
          Color
        </span>

        <Dropdown
          className={styles.optionsDropdown}
          value={color}
          onChange={handleColorChange}
          options={sortedColors}
          icon={PaletteIcon}
        />
      </div>

      <div className={clsx(styles.control, 'w-100 d-flex flex-column gap-2')}>
        <Button className="d-inline-flex align-items-center justify-content-center w-100" variant="primary" onClick={handleSpinChange}>
          <RotateIcon className="d-inline me-3" height={20} style={{ fill: '#fff' }} />

          Toggle Spin
        </Button>

        <Button className="d-inline-flex align-items-center justify-content-center w-100" variant="light" onClick={handleCloseClick}>
          <XIcon className="d-inline me-3" height={20} style={{ fill: '#000' }} />

          Close
        </Button>
      </div>
    </div>
  );
};
