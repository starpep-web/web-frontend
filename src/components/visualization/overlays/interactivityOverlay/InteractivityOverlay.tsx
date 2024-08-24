/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus  */
import React from 'react';
import UpDownLeftRightIcon from '@assets/svg/icons/up-down-left-right-solid.svg';
import styles from './InteractivityToggle.module.scss';

interface Props {
  enabled?: boolean
  onToggle?: () => void
}

export const InteractivityOverlay: React.FC<Props> = ({ enabled, onToggle }) => {
  const text = enabled ? 'Enabled' : 'Disabled';

  const handleClick = () => {
    onToggle?.();
  };

  return (
    <div className={styles.interactivityToggle}>
      <div
        role="button"
        className={styles.controlIcon}
        onClick={handleClick}
        title="Toggle Graph Interactivity"
      >
        <UpDownLeftRightIcon />

        <h6 className="mb-0">
          Interactive: {text}
        </h6>
      </div>
    </div>
  );
};
