import React, { Fragment, useReducer, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Dropdown } from '@components/form/dropdown';
import SingleQueryAlignmentOptionsForm from './SingleQueryAlignmentOptionsForm';
import { SUPPORTED_CRITERIA, DEFAULT_MULTI_ALIGNMENT_OPTIONS } from '@lib/services/bioApi/helpers/search';
import { MultiQueryAlignmentOptions, SingleQueryAlignmentOptions } from '@lib/services/bioApi/models/search';

type ReducerAction =
  | { type: 'SET_SINGLE_ALIGNMENT_OPTIONS', payload: SingleQueryAlignmentOptions }
  | { type: 'SET_CRITERION', payload: string };

const reducer = (state: MultiQueryAlignmentOptions, action: ReducerAction): MultiQueryAlignmentOptions => {
  switch (action.type) {
    case 'SET_SINGLE_ALIGNMENT_OPTIONS':
      return { ...state, ...action.payload };
    case 'SET_CRITERION':
      return { ...state, criterion: action.payload };
    default:
      return state;
  }
};

interface Props {
  onChange?: (options: MultiQueryAlignmentOptions) => void
}

const MultiQueryAlignmentOptionsForm: React.FC<Props> = ({ onChange }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_MULTI_ALIGNMENT_OPTIONS);

  useEffect(() => {
    onChange?.(state);
  }, [state]);

  const handleSingleAlignmentOptionsChange = (options: SingleQueryAlignmentOptions) => {
    dispatch({ type: 'SET_SINGLE_ALIGNMENT_OPTIONS', payload: options });
  };

  const handleCriterionChange = (criterion: string) => {
    dispatch({ type: 'SET_CRITERION', payload: criterion });
  };

  return (
    <Fragment>
      <SingleQueryAlignmentOptionsForm onChange={handleSingleAlignmentOptionsChange} />

      <Form.Group className="mb-3">
        <Dropdown
          label="Score Criterion"
          options={SUPPORTED_CRITERIA}
          value={state.criterion}
          onChange={handleCriterionChange}
        />
      </Form.Group>
    </Fragment>
  );
};

export default MultiQueryAlignmentOptionsForm;
