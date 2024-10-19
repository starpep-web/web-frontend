'use client';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import SearchExportModal from './SearchExportModal';
import UpRightFromSquareIcon from '@assets/svg/icons/up-right-from-square-solid.svg';
import { ExportPayloadType } from '@lib/services/bioApi/models/export';

interface Props {
  totalCount: number
  type: ExportPayloadType
  data: string
}

export const SearchExportButton: React.FC<Props> = ({ totalCount, type, data }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button variant="primary" className="w-100-sm d-inline-flex align-items-center justify-content-center" onClick={handleClick} disabled={totalCount < 1}>
        <UpRightFromSquareIcon
          className="d-inline me-3"
          height={20}
          style={{ fill: '#fff' }}
        />

          Export Search
      </Button>

      <SearchExportModal
        show={showModal}
        onClose={handleModalClose}
        onSuccess={handleModalClose}
        totalCount={totalCount}
        type={type}
        data={data}
      />
    </div>
  );
};
