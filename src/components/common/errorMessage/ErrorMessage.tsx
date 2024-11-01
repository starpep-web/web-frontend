import React from 'react';
import Alert from 'react-bootstrap/Alert';
import AlertHeading from 'react-bootstrap/AlertHeading';

interface Props {
  warning?: boolean
  header?: string
  description?: string
  error?: string
  show?: boolean
}

export const ErrorMessage: React.FC<Props> = ({ header, description, warning = false, error, show }) => {
  const color = warning ? 'warning' : 'danger';

  if (!show) {
    return null;
  }

  return (
    <Alert variant={color}>
      <AlertHeading className="mb-3">
        {header ?? 'Something happened'}
      </AlertHeading>

      <div>
        <p className="mb-0">
          {error}
        </p>

        {
          !!description && (
            <p className="mt-2 mb-0">
              {description}
            </p>
          )
        }
      </div>
    </Alert>
  );
};
