import React from 'react';
import { createPageMetadata } from '@lib/next/metadata';

export const generateMetadata = () => {
  return createPageMetadata('', {
    pageTitle: 'Page Not Found'
  });
};

const NotFoundPage = () => {
  return (
    <div>
      not found!
    </div>
  );
};

export default NotFoundPage;
