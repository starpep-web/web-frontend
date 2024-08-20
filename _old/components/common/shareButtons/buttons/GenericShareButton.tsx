import React from 'react';
import Link from 'next/link';
import { Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import clsx from 'clsx';

interface Props {
  text: string | null
  title?: string | null
  url: string
  icon: IconProp
  className?: string
}

const GenericShareButton: React.FC<Props> = ({ text, title, url, icon, className }) => {
  return (
    <Link className={clsx(className)} href={url} title={title ?? ''}>
      <Icon>
        <FontAwesomeIcon icon={icon} />
      </Icon>

      {
        text && (
          <span>
            {text}
          </span>
        )
      }
    </Link>
  );
};

export default GenericShareButton;
