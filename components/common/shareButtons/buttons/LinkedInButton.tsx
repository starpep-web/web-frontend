import React from 'react';
import GenericShareButton from './GenericShareButton';
import style from './ShareButton.module.scss';

const createShareUrl = (url: string): string => {
  return `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
};

interface Props {
  text?: string
  url: string
}

const LinkedInShareButton: React.FC<Props> = ({ text, url }) => {
  const buttonText = text ?? 'Share on LinkedIn';

  return (
    <GenericShareButton
      text={buttonText}
      url={createShareUrl(url)}
      icon={['fab', 'linkedin']}
      className={style['share-button-linkedin']}
    />
  );
};

export default LinkedInShareButton;
