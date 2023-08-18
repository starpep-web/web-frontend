import React, { MouseEvent } from 'react';
import { Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {

}

const SearchExportButton: React.FC<Props> = () => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Button color="primary" onClick={handleClick}>
      <Icon>
        <FontAwesomeIcon icon="up-right-from-square" />
      </Icon>
      <span>
        Export Search
      </span>
    </Button>
  );
};

export default SearchExportButton;
