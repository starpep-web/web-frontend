import React from 'react';
import { Heading, Block } from 'react-bulma-components';

interface Props {
  title: string
  values: string[]
}

const PeptideMetadataBlock: React.FC<Props> = ({ title, values }) => {
  return (
    <Block>
      <Heading size={4}>
        {title}
      </Heading>

      <Block>
        {values.toString()}
      </Block>
    </Block>
  );
};

export default PeptideMetadataBlock;
