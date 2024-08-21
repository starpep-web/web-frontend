'use client';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ClipboardIcon from '@assets/svg/icons/clipboard-solid.svg';

interface Props {
  withText?: boolean
  url: string
  className?: string
}

export const CopyToClipboardShareButton: React.FC<Props> = ({ withText, url, className }) => {
  const buttonText = withText ? 'Copy to Clipboard' : null;
  const titleText = !buttonText ? 'Copy to Clipboard' : null;

  return (
    <CopyToClipboard text={url}>
      <div role="button" className={className} title={titleText ?? ''}>
        <ClipboardIcon width={28} height={28} />

        {
          buttonText && (
            <span>
              {buttonText}
            </span>
          )
        }
      </div>
    </CopyToClipboard>
  );
};
