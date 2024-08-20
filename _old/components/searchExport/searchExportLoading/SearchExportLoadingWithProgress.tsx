import React from 'react';
import { Content, Heading, Block } from 'react-bulma-components';
import SearchExportProgressBar from './SearchExportProgressBar';
import SearchExportSteps from './SearchExportSteps';
import { useAutoRefresh } from '@components/hooks/autoRefresh';
import { SearchExportFormData, SearchExportResource } from '@lib/models/export';
import { DEFAULT_AUTO_RELOAD_INTERVAL_SECONDS } from '@lib/constants/site';

interface Props {
  done: SearchExportResource[]
  form: SearchExportFormData
}

const SearchExportLoadingWithProgress: React.FC<Props> = ({ done, form }) => {
  useAutoRefresh(DEFAULT_AUTO_RELOAD_INTERVAL_SECONDS);

  const exportedResources = Object.entries(form)
    .filter(([_, v]) => v)
    .map(([k]) => k as SearchExportResource);

  return (
    <Content>
      <Heading size={2} textAlign="center" mt={4} mb={6}>
        The Server is Processing your Export Request
      </Heading>

      <SearchExportProgressBar done={done} exported={exportedResources} />
      <SearchExportSteps done={done} exported={exportedResources} />

      <Block textAlign="center" my={4}>
        <p>
          The page will automatically refresh until the exporting is done, please leave this tab open.
        </p>
      </Block>
    </Content>
  );
};

export default SearchExportLoadingWithProgress;
