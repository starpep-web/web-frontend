import React, { useReducer, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Dropdown } from '@components/form/dropdown';
import { SUPPORTED_ALGORITHMS, SUPPORTED_MATRIX_NAMES, DEFAULT_SINGLE_ALIGNMENT_OPTIONS } from '@lib/services/bioApi/helpers/search';
import { SingleQueryAlignmentOptions } from '@lib/services/bioApi/models/search';

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

export const SingleQueryAlignmentOptionsForm: React.FC<Props> = ({ onChange }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_SINGLE_ALIGNMENT_OPTIONS);

  useEffect(() => {
    onChange?.(state);
  }, [state]);

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
    <Row>
      <Col xs={{ span: 12 }} lg={{ span: 6 }}>
        <Form.Group className="mb-4">
          <Dropdown
            label="Substitution Matrix"
            options={SUPPORTED_MATRIX_NAMES}
            value={state.matrix}
            onChange={handleMatrixChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold" column={false}>
            Alignment Algorithm
          </Form.Label>

          <div>
            {
              Object.entries(SUPPORTED_ALGORITHMS).map(([key, value]) => (
                <Form.Check
                  key={key}
                  id={key}
                  value={key}
                  label={value}
                  checked={state.alg === key}
                  onChange={handleAlgorithmChange}
                  name="alignment-alg"
                  type="radio"
                />
              ))
            }
          </div>
        </Form.Group>
      </Col>

      <Col xs={{ span: 12 }} lg={{ span: 6 }}>
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold" column={false}>
            Threshold
          </Form.Label>

          <div className="d-flex flex-row gap-3">
            <Form.Range
              className="flex-grow-1"
              min={0.01}
              max={1}
              step={0.01}
              value={state.threshold}
              onChange={handleThresholdChange}
            />
            <output className="text-end" style={{ minWidth: '35px' }}>
              {state.threshold.toFixed(2)}
            </output>
          </div>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold" column={false}>
            Max Results
          </Form.Label>

          <Form.Control
            type="number"
            min={0}
            step={1}
            value={state.max_quantity ?? ''}
            onChange={handleMaxQuantityChange}
            placeholder="Leave this blank to get all the results"
          />
        </Form.Group>
      </Col>
    </Row>
  );
};
