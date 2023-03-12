import React from 'react';

interface Props {
  show?: boolean
}

const RegexHelpMessage: React.FC<Props> = ({ show = true }) => {
  if (!show) {
    return null;
  }

  return (
    <div>
      HELP
    </div>
  );
};

export default RegexHelpMessage;
