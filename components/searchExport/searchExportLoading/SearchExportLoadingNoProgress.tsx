import React from 'react';
import { CenteredRefreshLoader } from '@components/common/centeredRefreshLoader';
import { DEFAULT_AUTO_RELOAD_INTERVAL_SECONDS } from '@lib/constants/site';

const SearchExportLoadingNoProgress = () => {
  return (
    <CenteredRefreshLoader
      title="Exporting your search..."
      subtitle="The server is currently processing your export request. The page will automatically refresh until the exporting is done."
      refreshInterval={DEFAULT_AUTO_RELOAD_INTERVAL_SECONDS}
    />
  );
};

export default SearchExportLoadingNoProgress;
