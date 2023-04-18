import { GetServerSidePropsResult } from 'next';
import { ROUTES } from '@lib/constants/routes';

const StatisticsPage = () => {
  return null;
};

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<unknown>> => {
  return {
    redirect: {
      permanent: true,
      destination: ROUTES.statisticsGeneralInformation
    }
  };
};

export default StatisticsPage;
