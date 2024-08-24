import React from 'react';

interface Props {
  sequence: string
}

export const PeptideTitle: React.FC<Props> = ({ sequence }) => {
  return (
    <h1 className="text-break mb-5">
      {sequence}
    </h1>
  );
};
