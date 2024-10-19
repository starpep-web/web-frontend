import React from 'react';
import prettyBytes from 'pretty-bytes';
import { SearchExportResource, SearchExportFormData, approximateBytesForItemPerPeptide } from '@lib/services/bioApi/models/export';

interface Props {
  total: number
  exportedItems: SearchExportFormData
}

export const ApproximateArchiveInformation: React.FC<Props> = ({ total, exportedItems }) => {
  const bytesPerPeptide = Object.entries(exportedItems)
    .filter(([_, v]) => v)
    .map(([k]) => approximateBytesForItemPerPeptide[k as SearchExportResource])
    .reduce((acc, cur) => acc + cur, 0);

  const totalBytes = bytesPerPeptide * total;
  const humanReadableSize = prettyBytes(totalBytes);

  return (
    <div className="text-muted">
      <p className="mb-0">
        Exported archive will include the selected items for {total} peptides.
      </p>

      <p className="mb-0">
        Approximate archive size: {humanReadableSize}.
      </p>
    </div>
  );
};
