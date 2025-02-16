import React from 'react';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';

interface Props {
  children?: React.ReactNode;
}

export const SearchBoxWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Card className="mb-5">
      <CardBody>
        {children}
      </CardBody>
    </Card>
  );
};
