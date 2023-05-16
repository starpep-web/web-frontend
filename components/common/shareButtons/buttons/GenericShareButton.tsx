import React from 'react';
import { Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import clsx from 'clsx';

interface Props {
  text: string
  url: string
  icon: IconProp
  className?: string
}

const GenericShareButton: React.FC<Props> = ({ text, url, icon, className }) => {
  return (
    <Button className={clsx(className)} renderAs="a" href={url}>
      <Icon>
        <FontAwesomeIcon icon={icon} />
      </Icon>

      <span>
        {text}
      </span>
    </Button>
  );
};

export default GenericShareButton;
