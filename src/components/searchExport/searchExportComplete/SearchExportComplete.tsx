import React from 'react';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import Button from 'react-bootstrap/Button';
import ExportedResourcesInformation from './ExportedResourcesInformation';
import { SearchExportFormData } from '@lib/services/bioApi/models/export';
import { NEXT_PUBLIC_DOWNLOADS_URL } from '@lib/config/app';

const getArchiveDownloadUrl = (taskId: string): string => {
  return `${NEXT_PUBLIC_DOWNLOADS_URL}/tmp/${taskId}.zip`;
};

interface Props {
  id: string
  form: SearchExportFormData
  peptideIds: string[]
  total: number
}

export const SearchExportComplete: React.FC<Props> = ({ id, form, peptideIds, total }) => {
  return (
    <div>
      <h2 className="text-center mt-4 mb-4">
        Your Export is Ready!
      </h2>

      <Card className="mb-4">
        <CardBody>
          <p className="mb-0">
            The server has finished exporting your search. Below you will find a link to download your archive.
          </p>

          <p className="mb">
            Please keep in mind that this link will only be valid for <strong>24 hours</strong>, after that, the
            server will remove the archive and you will need to re-export your search in case you need it again.
          </p>

          <div className="text-center">
            <Button as="a" href={getArchiveDownloadUrl(id)} target="_blank" variant="primary">
              Download Exported Archive (.zip)
            </Button>
          </div>
        </CardBody>
      </Card>

      <ExportedResourcesInformation form={form} peptideIds={peptideIds} total={total} />
    </div>
  );
};
