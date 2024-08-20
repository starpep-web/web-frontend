import React, { useEffect, useReducer } from 'react';
import { Button, Block, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MetadataFiltersFormItem from './MetadataFiltersFormItem';
import { TextQueryMetadataFilter } from '@lib/models/search';
import { DEFAULT_METADATA_FILTER } from '@lib/constants/search';

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

const MetadataFiltersForm: React.FC<Props> = ({ onChange }) => {
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
    <Block>
      <Block>
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
      </Block>

      <Button color="primary" className="w-100-mobile-only" onClick={handleAddFilter} type="button">
        <Icon align="left">
          <FontAwesomeIcon icon="plus" />
        </Icon>

        <span>
          Add Filter
        </span>
      </Button>
    </Block>
  );
};

export default MetadataFiltersForm;
