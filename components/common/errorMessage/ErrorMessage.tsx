import React from 'react';
import { Message } from 'react-bulma-components';

interface Props {
  warning?: boolean
  header?: string
  description?: string
  error?: string
  show?: boolean
}

const ErrorMessage: React.FC<Props> = ({ header, description, warning = false, error, show }) => {
  const color = warning ? 'warning' : 'danger';

  if (!show) {
    return null;
  }

  return (
    <Message color={color}>
      <Message.Header>
        {header ?? 'Something happened'}
      </Message.Header>

      <Message.Body>
        <p>
          {error}
        </p>

        {
          !!description && (
            <p>
              {description}
            </p>
          )
        }
      </Message.Body>
    </Message>
  );
};

export default ErrorMessage;
