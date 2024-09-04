import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';

interface Props {
  title: string
  children: React.ReactNode
  width?: string | number
  height?: string | number
  minWidth?: string | number
  minHeight?: string | number
  noTitleMargin?: boolean
  className?: string
}

export const WithTitledBox: React.FC<Props> = ({ title, children, width, height, minWidth, minHeight, noTitleMargin, className }) => {
  const outerStyle: CSSProperties = {
    width: width ?? '100%',
    height: height ?? '100%',
    overflowX: minWidth ? 'scroll' : 'hidden',
    overflowY: minHeight ? 'scroll' : 'hidden'
  };

  const innerStyle: CSSProperties = {
    minWidth: minWidth ?? '100%',
    minHeight: minHeight ?? '100%'
  };

  return (
    <Card className={className}>
      <CardBody>
        <h2 className={clsx(noTitleMargin ? 'mb-0' : 'mb-3')}>
          {title}
        </h2>

        <div style={outerStyle}>
          <div style={innerStyle}>
            {children}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
