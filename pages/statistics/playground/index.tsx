import React from 'react';
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import { Box } from 'react-bulma-components';
import { useRouter } from 'next/router';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import {
  getTotalAAFrequency,
  getFilterAAFrequency,
  FrequencyFilterType
} from '@lib/services/graphDb/statisticsService';
import { WithTitledBox } from '@components/common/withTitledBox';
import { BarChart } from '@components/statistics/charts';
import { PlaygroundFilter } from '@components/statistics/playgroundFilter';
import { NODE_LABELS } from '@lib/models/peptide';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';

interface ServerSideProps {
  totalAAFrequency: Record<string, number>
  filterAAFrequency: Record<string, number>
  frequencyFilterType: FrequencyFilterType | null
  frequencyFilterValue: string | null
}

interface Props extends ServerSideProps {

}

const StatisticsPlaygroundPage: React.FC<Props> = ({ totalAAFrequency, filterAAFrequency, frequencyFilterType, frequencyFilterValue }) => {
  const router = useRouter();

  const graphHeight = 400;

  const handleFrequencyFilterChange = (type: FrequencyFilterType, value: string) => {
    const params = { ...router.query, frequencyFilterType: type, frequencyFilterValue: value } as Record<string, string>;
    return router.push(DYNAMIC_ROUTES.statisticsPlayground(params));
  };

  return (
    <PageWrapper>
      <PageMetadata title="Statistics Playground" />

      <Box>
        <WithTitledBox title={`Overall Amino Acid Distribution Compared${Object.keys(filterAAFrequency).length ? ` ${frequencyFilterType}: ${frequencyFilterValue}` : ''}`} height={graphHeight}>
          <BarChart id="aa-distribution" data={{ total: totalAAFrequency, filtered: filterAAFrequency }} yTitle="Overall Frequency" xTitle="Amino Acid" />
        </WithTitledBox>
        <PlaygroundFilter defaultType={frequencyFilterType} defaultValue={frequencyFilterValue} onSubmit={handleFrequencyFilterChange} />
      </Box>

    </PageWrapper>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  const { frequencyFilterValue: frequencyFilterValueParam, frequencyFilterType: frequencyFilterTypeParam } = context.query;
  const frequencyFilterValue = frequencyFilterValueParam ?
    (Array.isArray(frequencyFilterValueParam) ? frequencyFilterValueParam[0] : frequencyFilterValueParam) :
    null;
  const frequencyFilterType = frequencyFilterTypeParam ?
    (Array.isArray(frequencyFilterTypeParam) ? frequencyFilterTypeParam[0] : frequencyFilterTypeParam) as FrequencyFilterType :
    null;

  const isFrequencyFilterTypeValid = frequencyFilterType && NODE_LABELS.includes(frequencyFilterType);

  const totalAAFrequency = await getTotalAAFrequency();
  const filterAAFrequency = isFrequencyFilterTypeValid && frequencyFilterValue ? await getFilterAAFrequency(frequencyFilterValue) : {};

  return {
    props: {
      totalAAFrequency,
      filterAAFrequency,
      frequencyFilterType,
      frequencyFilterValue
    }
  };
};

export default StatisticsPlaygroundPage;
