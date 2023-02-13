import React from 'react';
import { Box, Heading, Block } from 'react-bulma-components';

interface Props {
  title: string
  value: number
}

const NumberStatistic: React.FC<Props> = ({ title, value }) => {
  return (
    <Box>
      <Heading>
        {title}
      </Heading>
      <Block>
        <span>
          {value}
        </span>
      </Block>
    </Box>
  );
};

export default NumberStatistic;
