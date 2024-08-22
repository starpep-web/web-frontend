import React from 'react';
import { Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from '@components/form/dropdown';
import { AtomStyle, ColorScheme, ATOM_STYLES, COLOR_SCHEMES } from '@components/pdb/pdbViewer/types';
import clsx from 'clsx';
import styles from './ControlsOverlay.module.scss';

const sortedStyles = ATOM_STYLES.map((s) => s).sort((a, b) => a.localeCompare(b));
const sortedColors = COLOR_SCHEMES.map((s) => s).sort((a, b) => a.localeCompare(b));

interface Props {
  defaultStyle?: AtomStyle
  defaultColor?: ColorScheme

  onStyleChange?: (style: AtomStyle) => void
  onColorChange?: (color: ColorScheme) => void
  onSpinToggle?: () => void
  onClose?: () => void
}

const Controls: React.FC<Props> = ({
  defaultStyle,
  defaultColor,
  onStyleChange,
  onColorChange,
  onSpinToggle,
  onClose
}) => {
  const handleStyleChange = (value: string) => {
    onStyleChange?.(value as AtomStyle);
  };

  const handleColorChange = (value: string) => {
    onColorChange?.(value as ColorScheme);
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
          value={defaultStyle as string}
          onChange={handleStyleChange}
          options={sortedStyles}
          icon="shapes"
        />
      </div>

      <div className={styles.control}>
        <span className={styles.controlLabel}>
          Color
        </span>

        <Dropdown
          className={styles.optionsDropdown}
          value={defaultColor as string}
          onChange={handleColorChange}
          options={sortedColors}
          icon="palette"
        />
      </div>

      <Button.Group align="center" className={clsx(styles.control, 'w-100')}>
        <Button className="w-100" color="primary" onClick={handleSpinChange}>
          <Icon align="left" size="sm" mr={2}>
            <FontAwesomeIcon icon="rotate" />
          </Icon>

          Toggle Spin
        </Button>

        <Button className="w-100" color="gray" onClick={handleCloseClick}>
          <Icon align="left" size="sm" mr={2}>
            <FontAwesomeIcon icon="x" />
          </Icon>

          Close
        </Button>
      </Button.Group>


    </div>
  );
};

export default Controls;