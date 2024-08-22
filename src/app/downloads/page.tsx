import React from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.downloads, {
    pageTitle: 'Downloads'
  });
};

const DownloadsPage = () => {
  return (
    <div>
      Downloads!
    </div>
  );
};

export default DownloadsPage;
