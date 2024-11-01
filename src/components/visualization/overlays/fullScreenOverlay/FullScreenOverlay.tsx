import React from 'react';
import CompressIcon from '@assets/svg/icons/compress-solid.svg';
import ExpandIcon from '@assets/svg/icons/expand-solid.svg';
import styles from './FullScreenOverlay.module.scss';

interface Props {
  fullScreen?: boolean
  onToggle?: () => void
}

export const FullScreenOverlay: React.FC<Props> = ({ fullScreen, onToggle }) => {
  const handleClick = () => {
    onToggle?.();
  };

  return (
    <div className={styles.fullScreenOverlay}>
      {
        fullScreen ? (
          <CompressIcon
            title="Toggle Full Screen"
            className={styles.controlIcon}
            onClick={handleClick}
          />
        ) : (
          <ExpandIcon
            title="Toggle Full Screen"
            className={styles.controlIcon}
            onClick={handleClick}
          />
        )
      }
    </div>
  );
};
