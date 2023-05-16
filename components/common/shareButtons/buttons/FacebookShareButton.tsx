import React from 'react';
import GenericShareButton from './GenericShareButton';
import style from './ShareButton.module.scss';

const createShareUrl = (url: string): string => {
  return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
};

interface Props {
  text?: string
  url: string
}

const FacebookShareButton: React.FC<Props> = ({ text, url }) => {
  const buttonText = text ?? 'Share on Facebook';

  return (
    <GenericShareButton
      text={buttonText}
      url={createShareUrl(url)}
      icon={['fab', 'facebook']}
      className={style['share-button-facebook']}
    />
  );
};

export default FacebookShareButton;
