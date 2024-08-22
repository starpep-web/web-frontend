import React from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.statisticsFeatures, {
    pageTitle: 'Statistics - Features'
  });
};

const FeaturesStatisticsPage = () => {
  return (
    <div>
      Features!
    </div>
  );
};

export default FeaturesStatisticsPage;
