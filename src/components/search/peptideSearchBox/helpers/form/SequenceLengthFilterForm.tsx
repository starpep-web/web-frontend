import React from 'react';
import { BoundRangeSlider } from '@components/form/boundRangeLimit';
import { SequenceLengthFilter } from '@lib/services/api/models/search';

const MIN_SEQUENCE_LENGTH = 2;
const MAX_SEQUENCE_LENGTH = 100;

interface Props {
  onChange?: (filter: SequenceLengthFilter) => void
}

export const SequenceLengthFilterForm: React.FC<Props> = ({ onChange }) => {
  const handleSliderChange = (lower: string | number, upper: string | number) => {
    const min = Number.isNaN(lower) ? parseInt(lower as string, 10) : lower as number;
    const max = Number.isNaN(upper) ? parseInt(upper as string, 10) : upper as number;

    onChange?.([min, max]);
  };

  return (
    <BoundRangeSlider
      min={MIN_SEQUENCE_LENGTH}
      max={MAX_SEQUENCE_LENGTH}
      tooltip="active"
      showBounds
      onChange={handleSliderChange}
    />
  );
};
