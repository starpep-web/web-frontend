import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { SearchExportResource } from '@lib/services/bioApi/models/export';
import { formatNumberMaxDecimals } from '@lib/utils/number';

interface Props {
  done: SearchExportResource[]
  exported: SearchExportResource[]
}

const SearchExportProgressBar: React.FC<Props> = ({ done, exported }) => {
  const maxProgress = exported.length + 1; // We count the "archiving" process as an extra step.
  const currentProgress = done.length; // We don't add the "archiving" process so the progress bar never reaches 100%.
  const progressPercentage = formatNumberMaxDecimals(currentProgress / maxProgress * 100, 0);

  return (
    <div className="text-center mb-4">
      <ProgressBar
        className="mb-2"
        variant="primary"
        now={currentProgress}
        max={maxProgress}
        label={`${progressPercentage}%`}
        animated
      />
    </div>
  );
};

export default SearchExportProgressBar;
