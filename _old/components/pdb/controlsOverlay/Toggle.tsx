import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ControlsOverlay.module.scss';

interface Props {
  onToggle?: () => void
}

const Toggle: React.FC<Props> = ({ onToggle }) => {
  const handleClick = () => {
    onToggle?.();
  };

  return (
    <div className={styles.controlsToggle}>
      <FontAwesomeIcon
        title="Toggle Controls"
        className={styles.controlsToggleIcon}
        icon="gear"
        size="2x"
        onClick={handleClick}
      />
    </div>
  );
};

export default Toggle;
