import React from 'react';
import { Box, Heading, Block } from 'react-bulma-components';

interface Props {
  title: string
  children: React.ReactNode
}

const WithTitledBox: React.FC<Props> = ({ title, children }) => {
  return (
    <Box>
      <Heading>
        {title}
      </Heading>
      <Block>
        {children}
      </Block>
    </Box>
  );
};

export default WithTitledBox;
