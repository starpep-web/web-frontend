import React, { Fragment, useReducer, useEffect } from 'react';
import { Form } from 'react-bulma-components';
import { Dropdown } from '@components/form/dropdown';
import { Slider } from '@components/bulmaExtensions/form/slider';
import { SUPPORTED_ALGORITHMS, SUPPORTED_MATRIX_NAMES, DEFAULT_SINGLE_ALIGNMENT_OPTIONS } from '@lib/constants/search';
import { SingleQueryAlignmentOptions } from '@lib/models/search';

type ReducerAction =
  | { type: 'SET_MATRIX', payload: SingleQueryAlignmentOptions['matrix'] }
  | { type: 'SET_ALGORITHM', payload: SingleQueryAlignmentOptions['alg'] }
  | { type: 'SET_THRESHOLD', payload: SingleQueryAlignmentOptions['threshold'] }
  | { type: 'SET_MAX_QUANTITY', payload: SingleQueryAlignmentOptions['max_quantity'] };

const reducer = (state: SingleQueryAlignmentOptions, action: ReducerAction): SingleQueryAlignmentOptions => {
  switch (action.type) {
    case 'SET_MATRIX':
      return { ...state, matrix: action.payload };
    case 'SET_ALGORITHM':
      return { ...state, alg: action.payload };
    case 'SET_THRESHOLD':
      return { ...state, threshold: Math.max(0, Math.min(action.payload, 1)) };
    case 'SET_MAX_QUANTITY':
      return { ...state, max_quantity: action.payload ? Math.max(action.payload, 0) : null };
    default:
      return state;
  }
};

interface Props {
  onChange?: (options: SingleQueryAlignmentOptions) => void
}

const SingleQueryAlignmentOptionsForm: React.FC<Props> = ({ onChange }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_SINGLE_ALIGNMENT_OPTIONS);

  useEffect(() => {
    onChange?.(state);
  }, [state, onChange]);

  const handleMatrixChange = (matrix: string) => {
    dispatch({ type: 'SET_MATRIX', payload: matrix });
  };

  const handleAlgorithmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_ALGORITHM', payload: event.currentTarget.value });
  };

  const handleThresholdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_THRESHOLD', payload: event.currentTarget.valueAsNumber });
  };

  const handleMaxQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.currentTarget.value, 10);
    dispatch({ type: 'SET_MAX_QUANTITY', payload: Number.isNaN(value) ? null : value });
  };

  return (
    <Fragment>
      <Dropdown
        label="Substitution Matrix"
        options={SUPPORTED_MATRIX_NAMES}
        value={state.matrix}
        onChange={handleMatrixChange}
      />

      <Form.Field>
        <Form.Label>
          Alignment Algorithm
        </Form.Label>

        <Form.Control>
          {
            Object.entries(SUPPORTED_ALGORITHMS).map(([key, value]) => (
              <Form.Radio
                key={key}
                value={key}
                checked={state.alg === key}
                onChange={handleAlgorithmChange}
              >
                {value}
              </Form.Radio>
            ))
          }
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>
          Threshold
        </Form.Label>

        <Form.Control>
          <Slider
            min={0.01}
            max={1}
            step={0.01}
            value={state.threshold}
            onChange={handleThresholdChange}
            color="primary"
            circle
            showValue
          />
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>
          Max Results
        </Form.Label>

        <Form.Control>
          <Form.Input
            type="number"
            min={0}
            step={1}
            value={state.max_quantity}
            onChange={handleMaxQuantityChange}
          />
        </Form.Control>
      </Form.Field>
    </Fragment>
  );
};

export default SingleQueryAlignmentOptionsForm;
