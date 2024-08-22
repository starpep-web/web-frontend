/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus  */
import React from 'react';
import { Heading } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './InteractivityToggle.module.scss';

interface Props {
  enabled?: boolean
  onToggle?: () => void
}

const InteractivityOverlay: React.FC<Props> = ({ enabled, onToggle }) => {
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
        <FontAwesomeIcon
          icon="up-down-left-right"
          size="2x"
        />

        <Heading size={6}>
          Interactive: {text}
        </Heading>
      </div>
    </div>
  );
};

export default InteractivityOverlay;