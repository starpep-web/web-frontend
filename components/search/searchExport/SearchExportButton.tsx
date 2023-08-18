import React, { useState, Fragment, MouseEvent } from 'react';
import { Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchExportModal from './SearchExportModal';
import { SearchExportFormData } from '@lib/models/export';

interface Props {

}

const SearchExportButton: React.FC<Props> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleExport = (data: SearchExportFormData) => {
    setShowModal(false);
    console.log(data);
  };

  return (
    <Fragment>
      <Button color="primary" onClick={handleClick}>
        <Icon>
          <FontAwesomeIcon icon="up-right-from-square" />
        </Icon>
        <span>
          Export Search
        </span>
      </Button>

      <SearchExportModal
        show={showModal}
        onClose={handleModalClose}
        onExport={handleExport}
      />
    </Fragment>
  );
};

export default SearchExportButton;
