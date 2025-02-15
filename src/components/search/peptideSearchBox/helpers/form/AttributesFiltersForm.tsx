'use client';
import React, { useReducer, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { AttributesFilterFormItem } from '../input/AttributesFilterFormItem';
import PlusIcon from '@assets/svg/icons/plus-solid.svg';
import { TextQueryAttributeFilter } from '@lib/services/api/models/search';

const DEFAULT_ATTRIBUTE_FILTER: TextQueryAttributeFilter = ['AND', 'hydrophilicity', '<', 0];

type ReducerState = Record<string, TextQueryAttributeFilter>;

type ReducerAction =
  | { type: 'ADD_FILTER', payload: string }
  | { type: 'DELETE_FILTER', payload: string }
  | { type: 'SET_FILTER', payload: { id: string, filter: TextQueryAttributeFilter } };

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case 'ADD_FILTER':
      return {
        ...state,
        [action.payload]: [...DEFAULT_ATTRIBUTE_FILTER]
      };
    case 'DELETE_FILTER':
      const { [action.payload]: _, ...restOfState } = state;
      return restOfState;
    case 'SET_FILTER':
      return {
        ...state,
        [action.payload.id]: action.payload.filter
      };
    default:
      return state;
  }
};

interface Props {
  onChange?: (filters: TextQueryAttributeFilter[]) => void
}

export const AttributesFiltersForm: React.FC<Props> = ({ onChange }) => {
  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    onChange?.(Object.values(state));
  }, [state]);

  const handleAddFilter = () => {
    dispatch({ type: 'ADD_FILTER', payload: Math.random().toString() });
  };

  const handleFilterChange = (id: string) => (filter: TextQueryAttributeFilter) => {
    dispatch({ type: 'SET_FILTER', payload: { id, filter } });
  };

  const handleFilterDelete = (id: string) => () => {
    dispatch({ type: 'DELETE_FILTER', payload: id });
  };

  return (
    <div>
      <div className="d-flex flex-column gap-4 mb-4">
        {
          Object.entries(state).map(([id, filter]) => (
            <AttributesFilterFormItem
              key={id}
              value={filter}
              onChange={handleFilterChange(id)}
              onDelete={handleFilterDelete(id)}
            />
          ))
        }
      </div>

      <Button variant="primary" className="w-100-sm d-inline-flex align-items-center justify-content-center" onClick={handleAddFilter}>
        <PlusIcon className="d-inline me-3" height={20} style={{ fill: '#fff' }} />

        Add Filter
      </Button>
    </div>
  );
};
