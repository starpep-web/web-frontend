import React from 'react';
import GenericShareButton from './GenericShareButton';
import style from './ShareButton.module.scss';

const createShareUrl = (url: string): string => {
  return `https://twitter.com/intent/tweet?url=${url}&text=`;
};

interface Props {
  text?: string
  url: string
}

const TwitterShareButton: React.FC<Props> = ({ text, url }) => {
  const buttonText = text ?? 'Share on Twitter';

  return (
    <GenericShareButton
      text={buttonText}
      url={createShareUrl(url)}
      icon={['fab', 'twitter']}
      className={style['share-button-twitter']}
    />
  );
};

export default TwitterShareButton;
