import React from 'react';
import { Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import clsx from 'clsx';

interface Props {
  withText?: boolean
  url: string
  className?: string
}

const CopyToClipboardShareButton: React.FC<Props> = ({ withText, url, className }) => {
  const buttonText = withText ? 'Copy to Clipboard' : null;
  const titleText = !buttonText ? 'Copy to Clipboard' : null;

  return (
    <CopyToClipboard text={url}>
      <div role="button" className={clsx(className)} title={titleText ?? ''}>
        <Icon>
          <FontAwesomeIcon icon="clipboard" />
        </Icon>

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

export default CopyToClipboardShareButton;
