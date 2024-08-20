import React from 'react';
import { Block } from 'react-bulma-components';
import prettyBytes from 'pretty-bytes';
import { SearchExportResource, SearchExportFormData, approximateBytesForItemPerPeptide } from '@lib/models/export';

interface Props {
  peptideTotalCount: number
  exportedItems: SearchExportFormData
}

const ApproximateArchiveInformation: React.FC<Props> = ({ peptideTotalCount, exportedItems }) => {
  const bytesPerPeptide = Object.entries(exportedItems)
    .filter(([_, v]) => v)
    .map(([k]) => approximateBytesForItemPerPeptide[k as SearchExportResource])
    .reduce((acc, cur) => acc + cur, 0);

  const totalBytes = bytesPerPeptide * peptideTotalCount;
  const humanReadableSize = prettyBytes(totalBytes);

  return (
    <Block className="has-text-grey">
      <p>
        Exported archive will include the selected items for {peptideTotalCount} peptides.
      </p>

      <p>
        Approximate archive size: {humanReadableSize}.
      </p>
    </Block>
  );
};

export default ApproximateArchiveInformation;
