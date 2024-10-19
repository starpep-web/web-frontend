import React from 'react';
import clsx from 'clsx';
import { GenericShareButton } from './GenericShareButton';
import LinkedInIcon from '@assets/svg/icons/linkedin-brands-solid.svg';
import styles from './ShareButton.module.scss';

const createShareUrl = (url: string): string => {
  return `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
};

interface Props {
  withText?: boolean
  withStyle?: boolean
  url: string
}

export const LinkedInShareButton: React.FC<Props> = ({ withText, withStyle, url }) => {
  const buttonText = withText ? 'Share on LinkedIn' : null;
  const titleText = !buttonText ? 'Share on LinkedIn' : null;

  return (
    <GenericShareButton
      text={buttonText}
      title={titleText}
      url={createShareUrl(url)}
      icon={<LinkedInIcon width={28} height={28} />}
      className={clsx(withStyle && styles.shareButtonLinkedIn)}
    />
  );
};
