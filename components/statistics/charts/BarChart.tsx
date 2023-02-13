import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import uniqolor from 'uniqolor';

ChartJS.register(...registerables);

const parseData = (data: Record<string | number, number>) => {
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
  yTitle?: string
  xTitle?: string
}

const BarChart: React.FC<Props> = ({ id, data, yTitle, xTitle }) => {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        display: true,
        title: {
          display: !!yTitle,
          text: yTitle
        }
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

  return (
    <Bar
      data={parseData(data)}
      options={options}
      key={id}
      datasetIdKey={id}
      id={id}
      redraw={false}
    />
  );
};

export default BarChart;
