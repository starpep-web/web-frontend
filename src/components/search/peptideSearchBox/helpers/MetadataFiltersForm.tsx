'use client';
import React, { useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import { MetadataFiltersFormItem } from './MetadataFiltersFormItem';
import PlusIcon from '@assets/svg/icons/plus-solid.svg';
import { TextQueryMetadataFilter } from '@lib/services/api/models/search';

const DEFAULT_METADATA_FILTER: TextQueryMetadataFilter = ['AND', 'Database', 'EQUALS', ''];

type ReducerState = Record<string, TextQueryMetadataFilter>

type ReducerAction =
  | { type: 'ADD_FILTER', payload: string }
  | { type: 'DELETE_FILTER', payload: string }
  | { type: 'SET_FILTER', payload: { id: string, filter: TextQueryMetadataFilter } };

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case 'ADD_FILTER':
      return {
        ...state,
        [action.payload]: [...DEFAULT_METADATA_FILTER]
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
  onChange?: (filters: TextQueryMetadataFilter[]) => void
}

export const MetadataFiltersForm: React.FC<Props> = ({ onChange }) => {
  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    onChange?.(Object.values(state));
  }, [state]);

  const handleAddFilter = () => {
    dispatch({ type: 'ADD_FILTER', payload: Math.random().toString() });
  };

  const handleFilterChange = (id: string) => (filter: TextQueryMetadataFilter) => {
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
            <MetadataFiltersFormItem
              key={id}
              value={filter}
              onChange={handleFilterChange(id)}
              onDelete={handleFilterDelete(id)}
            />
          ))
        }
      </div>

      <Button variant="primary" className="w-100-sm d-inline-flex align-items-center justify-content-center" onClick={handleAddFilter} type="button">
        <PlusIcon className="d-inline me-3" height={20} style={{ fill: '#fff' }} />

        Add Filter
      </Button>
    </div>
  );
};
