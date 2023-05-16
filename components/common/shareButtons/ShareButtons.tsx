import React, { useEffect, useState } from 'react';
import { Block, Notification } from 'react-bulma-components';
import FacebookShareButton from './buttons/FacebookShareButton';
import TwitterShareButton from './buttons/TwitterShareButton';
import LinkedInButton from './buttons/LinkedInButton';
import CopyToClipboardShareButton from './buttons/CopyToClipboardShareButton';
import style from './ShareButtons.module.scss';

interface Props {
  url?: string | null
}

const ShareButtons: React.FC<Props> = ({ url }) => {
  const [shareUrl, setShareUrl] = useState<string>(url ?? '#');

  useEffect(() => {
    setShareUrl(url ?? window?.location?.href ?? '#');
  }, [url]);

  return (
    <Block>
      <Notification color="gray" className={style['buttons-container']}>
        <FacebookShareButton url={shareUrl} />
        <TwitterShareButton url={shareUrl} />
        <LinkedInButton url={shareUrl} />
        <CopyToClipboardShareButton url={shareUrl} />
      </Notification>
    </Block>
  );
};

export default ShareButtons;
