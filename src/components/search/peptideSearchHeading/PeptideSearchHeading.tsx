import React from 'react';
import { ExportPayloadType } from '@lib/services/bioApi/models/export';
import { SearchExportButton } from '@components/search/searchExport';

interface Props {
  title: string
  totalCount: number
  type: ExportPayloadType
  data: string
}

export const PeptideSearchHeading: React.FC<Props> = ({ title, totalCount, type, data }) => {
  return (
    <div className="d-flex flex-column flex-md-row mb-4 gap-md-4">
      <h1 className="flex-fill mb-4 text-break">
        {title}
      </h1>

      <SearchExportButton totalCount={totalCount} type={type} data={data} />
    </div>
  );
};
