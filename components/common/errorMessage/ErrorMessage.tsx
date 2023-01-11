import React from 'react';
import { Message } from 'react-bulma-components';

interface Props {
  warning?: boolean
  header?: string
  error: string
}

const ErrorMessage: React.FC<Props> = ({ header, warning = false, error }) => {
  const color = warning ? 'warning' : 'danger';

  return (
    <Message color={color}>
      <Message.Header>
        {header ?? 'Something happened'}
      </Message.Header>

      <Message.Body>
        {error}
      </Message.Body>
    </Message>
  );
};

export default ErrorMessage;
