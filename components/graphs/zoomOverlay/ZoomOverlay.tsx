import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ZoomOverlay.module.scss';

interface Props {
  step: number

  onChange?: (zoom: number) => void
  onReset?: () => void
}

const ZoomOverlay: React.FC<Props> = ({ step, onChange, onReset }) => {
  const handleClick = (sign: number) => () => {
    onChange?.(sign * step);
  };

  const handleResetClick = () => {
    onReset?.();
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
      <FontAwesomeIcon
        title="Reset Position"
        className={styles.controlIcon}
        icon="arrows-rotate"
        size="2x"
        onClick={handleResetClick}
      />
    </div>
  );
};

export default ZoomOverlay;
