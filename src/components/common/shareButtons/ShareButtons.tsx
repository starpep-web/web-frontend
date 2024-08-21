'use client';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { FacebookShareButton } from './buttons/FacebookShareButton';
import { TwitterShareButton } from './buttons/TwitterShareButton';
import { LinkedInShareButton } from './buttons/LinkedInShareButton';
import { CopyToClipboardShareButton } from './buttons/CopyToClipboardShareButton';

interface Props {
  url?: string | null
  withText?: boolean
  withStyle?: boolean
  withCopyToClipboard?: boolean
  className?: string
}

export const ShareButtons: React.FC<Props> = ({ url, withText, withStyle, withCopyToClipboard, className }) => {
  const [shareUrl, setShareUrl] = useState<string>(() => url ?? '#');

  useEffect(() => {
    setShareUrl(url ?? window?.location?.href ?? '#');
  }, [url]);

  return (
    <div className={clsx('d-flex gap-5', className)}>
      <FacebookShareButton url={shareUrl} withText={withText} withStyle={withStyle} />
      <TwitterShareButton url={shareUrl} withText={withText} withStyle={withStyle} />
      <LinkedInShareButton url={shareUrl} withText={withText} withStyle={withStyle} />

      {
        withCopyToClipboard && (
          <CopyToClipboardShareButton url={shareUrl} withText={withText} />
        )
      }
    </div>
  );
};
