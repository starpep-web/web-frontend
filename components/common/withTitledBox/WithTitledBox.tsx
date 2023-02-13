import React from 'react';
import { Box, Heading, Block } from 'react-bulma-components';

interface Props {
  title: string
  children: React.ReactNode
  width?: string | number
  height?: string | number
}

const WithTitledBox: React.FC<Props> = ({ title, children, width, height }) => {
  return (
    <Box>
      <Heading>
        {title}
      </Heading>
      <Block
        style={{
          width: width ?? '100%',
          height: height ?? '100%'
        }}
      >
        {children}
      </Block>
    </Box>
  );
};

export default WithTitledBox;
