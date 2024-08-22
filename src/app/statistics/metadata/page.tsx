import React from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.statisticsMetadata, {
    pageTitle: 'Statistics - Metadata'
  });
};

const MetadataStatisticsPage = () => {
  return (
    <div>
      Home!
    </div>
  );
};

export default MetadataStatisticsPage;
