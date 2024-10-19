'use client';
import React from 'react';
import SearchExportProgressBar from './SearchExportProgressBar';
import SearchExportSteps from './SearchExportSteps';
import { useAutoRefresh } from '@components/hooks/useAutoRefresh';
import { SearchExportFormData, SearchExportResource } from '@lib/services/bioApi/models/export';
import { DEFAULT_AUTO_RELOAD_INTERVAL_SECONDS } from '@lib/constants/app';

interface Props {
  done: SearchExportResource[]
  form: SearchExportFormData
}

export const SearchExportLoadingWithProgress: React.FC<Props> = ({ done, form }) => {
  useAutoRefresh(DEFAULT_AUTO_RELOAD_INTERVAL_SECONDS);

  const exportedResources = Object.entries(form)
    .filter(([_, v]) => v)
    .map(([k]) => k as SearchExportResource);

  return (
    <div>
      <h2 className="text-center mt-4 mb-5">
        The Server is Processing your Export Request
      </h2>

      <SearchExportProgressBar done={done} exported={exportedResources} />
      <SearchExportSteps done={done} exported={exportedResources} />

      <div className="text-center my-4">
        <p className="mb-0">
          The page will automatically refresh until the exporting is done, please leave this tab open.
        </p>
      </div>
    </div>
  );
};
