import React from 'react';
import GenericShareButton from './GenericShareButton';
import clsx from 'clsx';
import style from './ShareButton.module.scss';

const createShareUrl = (url: string): string => {
  return `https://twitter.com/intent/tweet?url=${url}&text=`;
};

interface Props {
  withText?: boolean
  withStyle?: boolean
  url: string
}

const TwitterShareButton: React.FC<Props> = ({ withText, withStyle, url }) => {
  const buttonText = withText ? 'Share on Twitter' : null;
  const titleText = !buttonText ? 'Share on Twitter' : null;

  return (
    <GenericShareButton
      text={buttonText}
      title={titleText}
      url={createShareUrl(url)}
      icon={['fab', 'twitter']}
      className={clsx({ [style['share-button-twitter']]: withStyle })}
    />
  );
};

export default TwitterShareButton;
