import React from 'react';
import clsx from 'clsx';
import { GenericShareButton } from './GenericShareButton';
import TwitterIcon from '@assets/svg/icons/square-x-twitter-brands-solid.svg';
import style from './ShareButton.module.scss';

const createShareUrl = (url: string): string => {
  return `https://twitter.com/intent/tweet?url=${url}&text=`;
};

interface Props {
  withText?: boolean
  withStyle?: boolean
  url: string
}

export const TwitterShareButton: React.FC<Props> = ({ withText, withStyle, url }) => {
  const buttonText = withText ? 'Share on Twitter' : null;
  const titleText = !buttonText ? 'Share on Twitter' : null;

  return (
    <GenericShareButton
      text={buttonText}
      title={titleText}
      url={createShareUrl(url)}
      icon={<TwitterIcon width={28} height={28} />}
      className={clsx(withStyle && style.shareButtonTwitter)}
    />
  );
};
