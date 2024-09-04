import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables, ChartOptions, ChartData } from 'chart.js';
import uniqolor from 'uniqolor';
import { LegendPosition } from './types';

ChartJS.register(...registerables);

const parseData = (data: Record<string | number, number>): ChartData<'pie', number[], string> => {
  return {
    labels: Object.keys(data),
    datasets: [{
      label: '',
      data: Object.values(data),
      backgroundColor: Object.values(data).map((value) => uniqolor(value, { format: 'rgb' }).color)
    }]
  };
};

interface Props {
  id: string
  data: Record<string | number, number>

  legendPosition?: LegendPosition
}

export const PieChart: React.FC<Props> = ({ id, data, legendPosition }) => {
  const options: ChartOptions<'pie'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: legendPosition ?? 'bottom' as const
      }
    }
  };

  return (
    <Pie
      data={parseData(data)}
      options={options}
      key={id}
      datasetIdKey={id}
      id={id}
      redraw={false}
    />
  );
};
