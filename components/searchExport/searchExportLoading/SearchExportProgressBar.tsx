import React from 'react';
import { SearchExportResource } from '@lib/models/export';
import { Block, Progress } from 'react-bulma-components';
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
    <Block textAlign="center" mb={4}>
      <Progress
        color="primary"
        size="large"
        mb={2}
        value={currentProgress}
        max={maxProgress}
      />

      <span className="has-text-grey">
        Current Progress: {progressPercentage}%
      </span>
    </Block>
  );
};

export default SearchExportProgressBar;
