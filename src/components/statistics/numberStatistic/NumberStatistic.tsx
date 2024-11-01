import React from 'react';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';

interface Props {
  title: string
  value: number
  className?: string
}

export const NumberStatistic: React.FC<Props> = ({ title, value, className }) => {
  return (
    <Card className={className}>
      <CardBody>
        <h2 className="mb-3">
          {title}
        </h2>

        <div>
          {value}
        </div>
      </CardBody>
    </Card>
  );
};
