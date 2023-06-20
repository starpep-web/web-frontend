import React from 'react';
import { Block, Notification } from 'react-bulma-components';

const MetadataFiltersHelpMessage = () => {
  return (
    <Block>
      <Notification color="info">
        Click on the plus icon and select the filters you wish to filter in your search.
        You can choose from a variety of operators and comparators.
        Each filter will be evaluated sequentially, there is no precedence of <strong>AND</strong> over <strong>OR</strong> operators.
      </Notification>
    </Block>
  );
};

export default MetadataFiltersHelpMessage;
