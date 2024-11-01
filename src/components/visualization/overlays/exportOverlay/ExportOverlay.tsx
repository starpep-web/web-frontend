import React from 'react';
import UpRightFromSquareIcon from '@assets/svg/icons/up-right-from-square-solid.svg';
import styles from './ExportOverlay.module.scss';

interface Props {
  onClick?: () => void
}

export const ExportOverlay: React.FC<Props> = ({ onClick }) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <div className={styles.exportOverlay}>
      <UpRightFromSquareIcon
        title="Export as Image"
        className={styles.controlIcon}
        onClick={handleClick}
      />
    </div>
  );
};
