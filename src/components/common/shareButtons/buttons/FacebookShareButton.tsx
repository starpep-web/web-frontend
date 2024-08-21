import React from 'react';
import clsx from 'clsx';
import { GenericShareButton } from './GenericShareButton';
import FacebookIcon from '@assets/svg/icons/square-facebook-brands-solid.svg';
import style from './ShareButton.module.scss';

const createShareUrl = (url: string): string => {
  return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
};

interface Props {
  withText?: boolean
  withStyle?: boolean
  url: string
}

export const FacebookShareButton: React.FC<Props> = ({ withText, withStyle, url }) => {
  const buttonText = withText ? 'Share on Facebook' : null;
  const titleText = !buttonText ? 'Share on Facebook' : null;

  return (
    <GenericShareButton
      text={buttonText}
      title={titleText}
      url={createShareUrl(url)}
      icon={<FacebookIcon width={28} height={28} />}
      className={clsx(withStyle && style.shareButtonFacebook)}
    />
  );
};
