import React from 'react';
import { Heading } from 'react-bulma-components';

interface Props {
  sequence: string
}

const PeptideTitle: React.FC<Props> = ({ sequence }) => {
  return (
    <Heading>
      {sequence}
    </Heading>
  );
};

export default PeptideTitle;
