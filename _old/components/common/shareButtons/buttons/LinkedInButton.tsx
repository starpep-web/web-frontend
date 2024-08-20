import React from 'react';
import GenericShareButton from './GenericShareButton';
import clsx from 'clsx';
import style from './ShareButton.module.scss';

const createShareUrl = (url: string): string => {
  return `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
};

interface Props {
  withText?: boolean
  withStyle?: boolean
  url: string
}

const LinkedInShareButton: React.FC<Props> = ({ withText, withStyle, url }) => {
  const buttonText = withText ? 'Share on LinkedIn' : null;
  const titleText = !buttonText ? 'Share on LinkedIn' : null;

  return (
    <GenericShareButton
      text={buttonText}
      title={titleText}
      url={createShareUrl(url)}
      icon={['fab', 'linkedin']}
      className={clsx({ [style['share-button-linkedin']]: withStyle })}
    />
  );
};

export default LinkedInShareButton;
