import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ZoomOverlay.module.scss';

interface Props {
  step: number

  onChange?: (zoom: number) => void
}

const ZoomOverlay: React.FC<Props> = ({ step, onChange }) => {
  const handleClick = (sign: number) => () => {
    onChange?.(sign * step);
  };

  return (
    <div className={styles.zoomOverlay}>
      <FontAwesomeIcon
        title="Zoom In"
        className={styles.controlIcon}
        icon="magnifying-glass-plus"
        size="2x"
        onClick={handleClick(1)}
      />
      <FontAwesomeIcon
        title="Zoom Out"
        className={styles.controlIcon}
        icon="magnifying-glass-minus"
        size="2x"
        onClick={handleClick(-1)}
      />
    </div>
  );
};

export default ZoomOverlay;
