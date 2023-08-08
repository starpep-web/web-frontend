import React, { useReducer, useEffect } from 'react';
import { Block, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AttributesFilterFormItem from './AttributesFilterFormItem';
import { DEFAULT_ATTRIBUTE_FILTER } from '@lib/constants/search';
import { TextQueryAttributeFilter } from '@lib/models/search';

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

const AttributesFiltersForm: React.FC<Props> = ({ onChange }) => {
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
    <Block>
      <Block>
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

export default AttributesFiltersForm;
