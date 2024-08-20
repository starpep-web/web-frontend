import React from 'react';
import GenericShareButton from './GenericShareButton';
import clsx from 'clsx';
import style from './ShareButton.module.scss';

const createShareUrl = (url: string): string => {
  return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
};

interface Props {
  withText?: boolean
  withStyle?: boolean
  url: string
}

const FacebookShareButton: React.FC<Props> = ({ withText, withStyle, url }) => {
  const buttonText = withText ? 'Share on Facebook' : null;
  const titleText = !buttonText ? 'Share on Facebook' : null;

  return (
    <GenericShareButton
      text={buttonText}
      title={titleText}
      url={createShareUrl(url)}
      icon={['fab', 'facebook']}
      className={clsx({ [style['share-button-facebook']]: withStyle })}
    />
  );
};

export default FacebookShareButton;
