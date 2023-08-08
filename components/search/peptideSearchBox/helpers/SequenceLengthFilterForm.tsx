import React from 'react';
import { Block } from 'react-bulma-components';
import { BoundedRangeSlider } from '@components/form/boundedRangeSlider';
import { SequenceLengthFilter } from '@lib/models/search';
import { MIN_SEQUENCE_LENGTH, MAX_SEQUENCE_LENGTH } from '@lib/constants/search';

interface Props {
  onChange?: (filter: SequenceLengthFilter) => void
}

const SequenceLengthFilterForm: React.FC<Props> = ({ onChange }) => {
  const handleSliderChange = (lower: string | number, upper: string | number) => {
    const min = Number.isNaN(lower) ? parseInt(lower as string, 10) : lower as number;
    const max = Number.isNaN(upper) ? parseInt(upper as string, 10) : upper as number;

    onChange?.([min, max]);
  };

  return (
    <Block>
      <BoundedRangeSlider
        min={MIN_SEQUENCE_LENGTH}
        max={MAX_SEQUENCE_LENGTH}
        tooltip="active"
        showBounds
        onChange={handleSliderChange}
      />
    </Block>
  );
};

export default SequenceLengthFilterForm;
