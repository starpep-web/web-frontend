import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './FullScreenOverlay.module.scss';

interface Props {
  fullScreen?: boolean
  onToggle?: () => void
}

const FullScreenOverlay: React.FC<Props> = ({ fullScreen, onToggle }) => {
  const icon: IconProp = fullScreen ? 'compress' : 'expand';

  const handleClick = () => {
    onToggle?.();
  };

  return (
    <div className={styles.fullScreenOverlay}>
      <FontAwesomeIcon
        title="Toggle Full Screen"
        className={styles.controlIcon}
        icon={icon}
        size="2x"
        onClick={handleClick}
      />
    </div>
  );
};

export default FullScreenOverlay;
