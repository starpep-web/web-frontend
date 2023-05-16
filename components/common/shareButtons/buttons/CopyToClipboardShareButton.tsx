import React from 'react';
import { Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface Props {
  text?: string
  url: string
}

const CopyToClipboardShareButton: React.FC<Props> = ({ text, url }) => {
  const buttonText = text ?? 'Copy to Clipboard';

  return (
    <CopyToClipboard text={url}>
      <Button color="primary">
        <Icon>
          <FontAwesomeIcon icon="clipboard" />
        </Icon>

        <span>
          {buttonText}
        </span>
      </Button>
    </CopyToClipboard>
  );
};

export default CopyToClipboardShareButton;
