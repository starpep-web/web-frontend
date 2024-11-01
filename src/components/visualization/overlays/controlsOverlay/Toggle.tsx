import React from 'react';
import GearIcon from '@assets/svg/icons/gear-solid.svg';
import styles from './ControlsOverlay.module.scss';

interface Props {
  onToggle?: () => void
}

export const Toggle: React.FC<Props> = ({ onToggle }) => {
  const handleClick = () => {
    onToggle?.();
  };

  return (
    <div className={styles.controlsToggle}>
      <GearIcon
        title="Toggle Controls"
        className={styles.controlsToggleIcon}
        onClick={handleClick}
      />
    </div>
  );
};
