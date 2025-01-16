import React from 'react';
import Container from 'react-bootstrap/Container';
import clsx from 'clsx';


interface Props {
  children?: React.ReactNode;
  className?: string;
  main?: boolean;
  fluid?: boolean;
}

export const PageContainer = ({ children, className, main, fluid }: Props) => {
  return (
    <Container
      as={main ? 'main' : undefined}
      fluid={fluid}
      className={clsx('mt-4 mb-4 px-2', fluid ? 'px-md-4' : 'px-md-0', className)}
    >
      {children}
    </Container>
  );
};
