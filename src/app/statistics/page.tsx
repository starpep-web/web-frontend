import { permanentRedirect, RedirectType } from 'next/navigation';
import { RouteDefs } from '@lib/constants/routes';
import { createPageMetadata } from '@lib/next/metadata';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.statistics, {
    pageTitle: 'Statistics'
  });
};

const StatisticsPage = () => {
  return permanentRedirect(RouteDefs.statisticsGeneralInformation, RedirectType.replace);
};

export default StatisticsPage;
