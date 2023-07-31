import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ExportOverlay.module.scss';

interface Props {
  onClick?: () => void
}

const ExportOverlay: React.FC<Props> = ({ onClick }) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <div className={styles.exportOverlay}>
      <FontAwesomeIcon
        title="Export as Image"
        className={styles.controlIcon}
        icon="up-right-from-square"
        size="2x"
        onClick={handleClick}
      />
    </div>
  );
};

export default ExportOverlay;
