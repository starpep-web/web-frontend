import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import uniqolor from 'uniqolor';
import { NumericDataProp } from './types';

ChartJS.register(...registerables);

const parseData = (data: NumericDataProp) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const [firstValue] = values;
  const isDataComposite = firstValue && typeof firstValue === 'object';

  if (isDataComposite) {
    return {
      labels: Object.keys(firstValue),
      datasets: (values as Record<string | number, number>[]).map((nestedObj, idx) => {
        const key = keys[idx];
        const innerValues = Object.values(nestedObj);

        return {
          label: key,
          data: innerValues,
          backgroundColor: uniqolor(key, { format: 'rgb' }).color
        };
      })
    };
  }

  return {
    labels: keys,
    datasets: [{
      label: '',
      data: values,
      backgroundColor: (values as number[]).map((value) => uniqolor(value, { format: 'rgb' }).color)
    }]
  };
};

interface Props {
  id: string
  data: NumericDataProp
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
