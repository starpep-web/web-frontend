import React from 'react';
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { getTotalAAFrequency, getFilterAAFrequency } from '@lib/services/graphDb/statisticsService';
import { WithTitledBox } from '@components/common/withTitledBox';
import { BarChart } from '@components/statistics/charts';
import { NodeLabel, NODE_LABELS } from '@lib/models/peptide';

interface ServerSideProps {
  totalAAFrequency: Record<string, number>
  filterAAFrequency: Record<string, number>
  frequencyFilterType: NodeLabel | null
  frequencyFilterValue: string | null
}

interface Props extends ServerSideProps {

}

const StatisticsPlaygroundPage: React.FC<Props> = ({ totalAAFrequency, filterAAFrequency, frequencyFilterType, frequencyFilterValue }) => {
  const graphHeight = 400;

  return (
    <PageWrapper>
      <PageMetadata title="Statistics Playground" />

      <WithTitledBox title="Overall Amino Acid Distribution Compared" height={graphHeight}>
        <div>
          {frequencyFilterType} {frequencyFilterValue}
        </div>
        <BarChart id="aa-distribution" data={{ total: totalAAFrequency, filtered: filterAAFrequency }} yTitle="Overall Frequency" xTitle="Amino Acid" />
      </WithTitledBox>
    </PageWrapper>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  const { frequencyFilterValue: frequencyFilterValueParam, frequencyFilterType: frequencyFilterTypeParam } = context.query;
  const frequencyFilterValue = frequencyFilterValueParam ?
    (Array.isArray(frequencyFilterValueParam) ? frequencyFilterValueParam[0] : frequencyFilterValueParam) :
    null;
  const frequencyFilterType = frequencyFilterTypeParam ?
    (Array.isArray(frequencyFilterTypeParam) ? frequencyFilterTypeParam[0] : frequencyFilterTypeParam) as NodeLabel :
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
