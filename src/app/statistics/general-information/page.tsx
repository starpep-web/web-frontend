import React from 'react';
import { getDatabaseDistribution, getDatabaseHeatmap, getFunctionDistribution, getPeptideCount, getUnusualPeptideCount } from '@lib/services/api/endpoints/statistics';

const GeneralInformationStatisticsPage = async () => {
  const count = await getPeptideCount();
  const unusualCount = await getUnusualPeptideCount();
  const functionDistribution = await getFunctionDistribution();
  const databaseDistribution = await getDatabaseDistribution();
  const databaseHeatmap = await getDatabaseHeatmap();

  return (
    <div>
      <pre>
        {JSON.stringify({
          count, unusualCount, functionDistribution, databaseDistribution, databaseHeatmap
        }, null, 2)}
      </pre>
    </div>
  );
};

export default GeneralInformationStatisticsPage;
