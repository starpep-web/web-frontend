import React from 'react';
import { Block, Notification } from 'react-bulma-components';

const FiltersHelpMessage = () => {
  return (
    <Block>
      <Notification color="info">
        Click on the plus icon and select the filters you wish to use in your search.
        You can choose from a variety of operators and comparators for both metadata and features.
        Each filter will be evaluated sequentially in the order that they're inserted, <span className="is-underlined">there is no precedence of <strong>AND</strong> over <strong>OR</strong> operators.</span>
      </Notification>
    </Block>
  );
};

export default FiltersHelpMessage;
