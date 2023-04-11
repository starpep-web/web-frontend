import React, { ChangeEvent } from 'react';
import { Heading, Block, Form } from 'react-bulma-components';
import { Dropdown } from '@components/form/dropdown';
import { AtomStyle, ColorScheme, ATOM_STYLES, COLOR_SCHEMES } from '@components/pdb/pdbViewer/types';
import styles from './ControlsOverlay.module.scss';

const sortedStyles = ATOM_STYLES.map((s) => s).sort((a, b) => a.localeCompare(b));
const sortedColors = COLOR_SCHEMES.map((s) => s).sort((a, b) => a.localeCompare(b));

interface Props {
  defaultStyle?: AtomStyle
  defaultColor?: ColorScheme
  defaultSpin?: boolean

  onStyleChange?: (style: AtomStyle) => void
  onColorChange?: (color: ColorScheme) => void
  onSpinChange?: (spin: boolean) => void
}

const ControlsOverlay: React.FC<Props> = ({
  defaultStyle,
  defaultColor,
  defaultSpin,
  onStyleChange,
  onColorChange,
  onSpinChange
}) => {
  const handleStyleChange = (value: string) => {
    onStyleChange?.(value as AtomStyle);
  };

  const handleColorChange = (value: string) => {
    onColorChange?.(value as ColorScheme);
  };

  const handleSpinChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSpinChange?.(e.currentTarget.checked);
  };

  return (
    <div className={styles.controlsOverlay}>
      <Block>
        <Heading className="align-center" size={6}>
          Style
        </Heading>

        <Dropdown
          className={styles.optionsDropdown}
          value={defaultStyle as string}
          onChange={handleStyleChange}
          options={sortedStyles}
          icon="shapes"
        />
      </Block>

      <Block>
        <Heading className="align-center" size={6}>
          Color
        </Heading>

        <Dropdown
          className={styles.optionsDropdown}
          value={defaultColor as string}
          onChange={handleColorChange}
          options={sortedColors}
          icon="palette"
        />
      </Block>

      <Block>
        <Heading className="align-center" size={6}>
          Spin
        </Heading>

        <Form.Checkbox
          defaultChecked={defaultSpin}
          onChange={handleSpinChange}
        />
      </Block>
    </div>
  );
};

export default ControlsOverlay;
