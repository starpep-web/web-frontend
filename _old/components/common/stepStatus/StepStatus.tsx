import React from 'react';
import { Block, Icon, Heading } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Status = 'success' | 'in-progress' | 'error';
type StatusOptions = {
  icon: IconProp,
  background: string,
  color: string,
  spin: boolean
}

const statusOptions: Record<Status, StatusOptions> = {
  success: {
    icon: 'check',
    background: 'success',
    color: 'white',
    spin: false
  },
  'in-progress': {
    icon: 'spinner',
    background: 'primary',
    color: 'white',
    spin: true
  },
  error: {
    icon: 'x',
    background: 'danger',
    color: 'white',
    spin: false
  }
};

interface Props {
  status: Status
  text: string
}

const StepStatus: React.FC<Props> = ({ status, text }) => {
  const { icon, background, color, spin } = statusOptions[status];

  return (
    <Block className="is-flex" alignItems="center" mb="0">
      <Icon backgroundColor={background} m={4} p={5} className="is-border-circle">
        <FontAwesomeIcon size="2x" icon={icon} color={color} spin={spin} />
      </Icon>

      <Heading className="is-flex-grow-1" size={6} m="0">
        {text}
      </Heading>
    </Block>
  );
};

export default StepStatus;
