import React, { useState, Fragment, MouseEvent } from 'react';
import { Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchExportModal from './SearchExportModal';
import { SearchType } from '@lib/models/export';

interface Props {
  peptideTotalCount: number
  searchType: SearchType
  exportPayloadData: string
}

const SearchExportButton: React.FC<Props> = ({ peptideTotalCount, searchType, exportPayloadData }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      <Button color="primary" onClick={handleClick} disabled={peptideTotalCount < 1}>
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
        onSuccess={handleModalClose}
        peptideTotalCount={peptideTotalCount}
        searchType={searchType}
        exportPayloadData={exportPayloadData}
      />
    </Fragment>
  );
};

export default SearchExportButton;
