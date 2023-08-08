import React, { useRef, useEffect } from 'react';
import { Block } from 'react-bulma-components';
import noUiSlider, { API } from 'nouislider';
import clsx from 'clsx';
import { formatNumberMaxDecimals } from '@lib/utils/number';

const DEFAULT_STEP = 1;

const defaultFromFormatter = (value: string): number => {
  return Number(value);
};

const defaultToFormatter = (value: number): string => {
  return formatNumberMaxDecimals(value, 0);
};

type TooltipOption = boolean | 'active';

interface Props {
  min: number
  max: number
  initialLow?: number
  initialHigh?: number
  step?: number
  minSeparation?: number | undefined
  maxSeparation?: number | undefined
  tooltip?: TooltipOption
  showBounds?: boolean

  onChange?: (lowerBound: string | number, upperBound: string | number) => void
}

const BoundedRangeSlider: React.FC<Props> = ({
  min,
  max,
  initialLow,
  initialHigh,
  step = DEFAULT_STEP,
  minSeparation,
  maxSeparation,
  tooltip,
  showBounds,
  onChange
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const sliderInstance = useRef<API>();

  useEffect(() => {
    if (!ref.current || sliderInstance.current) {
      return;
    }

    sliderInstance.current = noUiSlider.create(ref.current, {
      start: [initialLow ?? min, initialHigh ?? max],
      connect: true,
      step,
      margin: minSeparation,
      limit: maxSeparation,
      tooltips: !!tooltip,
      range: {
        min,
        max
      },
      format: {
        from: defaultFromFormatter,
        to: defaultToFormatter
      }
    });

    return () => {
      sliderInstance.current?.destroy();
      sliderInstance.current = undefined;
    };
  }, [ref.current]);

  useEffect(() => {
    if (!sliderInstance.current) {
      return;
    }

    sliderInstance.current.on('change', ([lowerBound, upperBound]) => {
      onChange?.(lowerBound, upperBound);
    });

    return () => {
      sliderInstance.current?.off('change');
    };
  }, [sliderInstance.current, onChange]);

  useEffect(() => {
    sliderInstance.current?.updateOptions({
      start: [initialLow ?? min, initialHigh ?? max],
      step,
      margin: minSeparation,
      limit: maxSeparation,
      tooltips: !!tooltip,
      range: {
        min,
        max
      }
    }, false);
  }, [initialLow, min, initialHigh, max, step, minSeparation, maxSeparation, tooltip]);

  return (
    <Block className="is-flex is-flex-direction-row is-align-items-center">
      {
        showBounds && (
          <span className="mr-4">
            {min}
          </span>
        )
      }

      <div className={clsx('custom-noUi-slider is-flex-grow-1', { 'noUi-active-tooltip': tooltip === 'active' })} ref={ref} />

      {
        showBounds && (
          <span className="ml-4">
            {max}
          </span>
        )
      }
    </Block>
  );
};

export default BoundedRangeSlider;
