import React from 'react';
import { Heading, Button, Box, Block, Content } from 'react-bulma-components';
import ExportedResourcesInformation from './ExportedResourcesInformation';
import { SearchExportFormData } from '@lib/models/export';
import { PUBLIC_DOWNLOADS_URL } from '@lib/config';

const getArchiveDownloadUrl = (taskId: string): string => {
  return `${PUBLIC_DOWNLOADS_URL}/tmp/${taskId}.zip`;
};

interface Props {
  id: string
  form: SearchExportFormData
  peptideIds: string[]
  total: number
}

const SearchExportComplete: React.FC<Props> = ({ id, form, peptideIds, total }) => {
  return (
    <Block>
      <Heading textAlign="center" size={2} mt={4}>
        Your Export is Ready!
      </Heading>

      <Box mb={6}>
        <Content>
          <p>
            The server has finished exporting your search. Below you will find a link to download your archive.
          </p>

          <p>
            Please keep in mind that this link will only be valid for <strong>24 hours</strong>, after that, the
            server will remove the archive and you will need to re-export your search in case you need it again.
          </p>

          <Block textAlign="center">
            <Button renderAs="a" href={getArchiveDownloadUrl(id)} target="_blank" color="primary">
              Download Exported Archive (.zip)
            </Button>
          </Block>
        </Content>
      </Box>

      <ExportedResourcesInformation form={form} peptideIds={peptideIds} total={total} />
    </Block>
  );
};

export default SearchExportComplete;
