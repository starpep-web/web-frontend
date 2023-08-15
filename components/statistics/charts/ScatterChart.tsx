import React, { useMemo } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, registerables, ChartOptions, ChartData } from 'chart.js';
import uniqolor from 'uniqolor';
import { DataVector2D } from '@lib/models/statistics';

ChartJS.register(...registerables);

interface ParseDataOptions {
  color?: string
}

const parseData = (data: DataVector2D, options: ParseDataOptions = {}): ChartData<'scatter', DataVector2D, string> => {
  return {
    labels: ['Dataset'],
    datasets: [{
      label: '',
      data: data,
      pointBackgroundColor: options.color ?? uniqolor(Math.random().toString(), { format: 'rgb' }).color,
      pointBorderWidth: 0
    }]
  };
};

interface Props {
  id: string
  data: DataVector2D
  yTitle?: string
  xTitle?: string
  showLegend?: boolean
  color?: string
  beginAtZero?: boolean
}

const ScatterChart: React.FC<Props> = ({ id, data, yTitle, xTitle, showLegend, color, beginAtZero }) => {
  const options: ChartOptions<'scatter'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: showLegend ?? false
      }
    },
    scales: {
      y: {
        display: true,
        title: {
          display: !!yTitle,
          text: yTitle
        },
        beginAtZero: beginAtZero ?? true
      },
      x: {
        display: true,
        title: {
          display: !!xTitle,
          text: xTitle
        }
      }
    }
  };

  const parsedData = useMemo(() => {
    return parseData(data, { color });
  }, [data, color]);

  return (
    <Scatter
      data={parsedData}
      options={options}
      key={id}
      datasetIdKey={id}
      id={id}
      redraw={false}
    />
  );
};

export default ScatterChart;
