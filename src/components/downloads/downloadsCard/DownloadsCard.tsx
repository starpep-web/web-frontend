import React from 'react';
import Alert from 'react-bootstrap/Alert';

interface Props {
  title: string
  className?: string
  children?: React.ReactNode
}

export const DownloadsCard : React.FC<Props> = ({ title, className, children }) => {
  return (
    <Alert variant="light" className={className}>
      <h2 className="mb-4">
        {title}
      </h2>

      <div className="d-flex flex-column gap-3">
        {children}
      </div>
    </Alert>
  );
};
