import React from 'react';
import { RefreshLoader } from 'src/components/common/refreshLoader';
import { DEFAULT_AUTO_RELOAD_INTERVAL_SECONDS } from '@lib/constants/site';

const SearchExportLoadingNoProgress = () => {
  return (
    <RefreshLoader
      title="Exporting your search..."
      subtitle="The server is currently processing your export request. The page will automatically refresh until the exporting is done."
      refreshInterval={DEFAULT_AUTO_RELOAD_INTERVAL_SECONDS}
    />
  );
};

export default SearchExportLoadingNoProgress;
