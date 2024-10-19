'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import SearchExportForm from './SearchExportForm';
import ApproximateArchiveInformation from './ApproximateArchiveInformation';
import { useClientNavigation } from '@components/hooks/useClientNavigation';
import {
  SearchExportFormData,
  isSearchExportFormDataValid,
  DEFAULT_EXPORT_FORM_DATA,
  ExportPayloadType,
  ExportRequestPayload
} from '@lib/services/bioApi/models/export';
import { postTextQueryExportAction } from '@actions/export/text-query';
import { postSingleQueryExportAction } from '@actions/export/single-query';
import { postMultiQueryExportAction } from '@actions/export/multi-query';
import { RouteDefs } from '@lib/constants/routes';

const postExportTask = (payload: ExportRequestPayload) => {
  switch (payload.type) {
    case 'text':
      return postTextQueryExportAction(payload);
    case 'single':
      return postSingleQueryExportAction(payload);
    case 'multi':
      return postMultiQueryExportAction(payload);
    default:
      throw new Error(`Invalid type ${payload.type} provided.`);
  }
};

interface Props {
  totalCount: number
  type: ExportPayloadType
  data: string

  show?: boolean
  onClose?: () => void
  onSuccess?: () => void
}

const SearchExportModal: React.FC<Props> = ({ totalCount, type, data, show, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<SearchExportFormData>(DEFAULT_EXPORT_FORM_DATA);
  const [error, setError] = useState<string | null>(null);
  const { navigateToNewTab } = useClientNavigation();

  const handleFormChange = (data: SearchExportFormData) => {
    setError(null);
    setFormData(data);
  };

  const handleExportClick = async () => {
    if (!isSearchExportFormDataValid(formData)) {
      setError('Please choose at least one item to include in your search export.');
      return;
    }

    const payload: ExportRequestPayload = {
      type: type,
      form: formData,
      data: data
    };

    try {
      const exportTask = await postExportTask(payload);

      navigateToNewTab(RouteDefs.searchExport(type, exportTask.id));
      onSuccess?.();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <ModalHeader closeButton>
        <ModalTitle>
          Export this Search
        </ModalTitle>
      </ModalHeader>

      <ModalBody>
        <div>
          <p>
            Export this search by choosing what items you would like to include in the export archive.
            This archive will include all the files that you choose below for every peptide that was matched by your search.
            You should choose at least one item to include in your exports archive.
          </p>

          <p>
            Keep in mind that the server will need some time to generate the exports
            archive, <strong>this process can take quite some time</strong> depending on the number of peptides matched
            by your search and the items you decide to include.
            Each archive <strong>will be available to download for up to 24 hours</strong>, after that,
            the server will remove it, and you will have to re-export it in case you need it again.
          </p>

          <p>
            Also, if you prefer to download any item for the entire database,
            feel free to check the <Link href={RouteDefs.downloads}>downloads page</Link> where you will find archives
            that include any assets for all peptides in the database.
          </p>
        </div>

        {
          error && (
            <Alert variant="danger">
              <p>
                {error}
              </p>
            </Alert>
          )
        }

        <SearchExportForm
          initialData={formData}
          onChange={handleFormChange}
        />

        <ApproximateArchiveInformation total={totalCount} exportedItems={formData} />
      </ModalBody>

      <ModalFooter className="d-flex align-items-end gap-2">
        <Button variant="primary" onClick={handleExportClick}>
          Export
        </Button>

        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SearchExportModal;
