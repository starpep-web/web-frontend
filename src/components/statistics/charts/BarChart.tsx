'use client';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables, ChartOptions, ChartData } from 'chart.js';
import uniqolor from 'uniqolor';
import { NumericDataProp } from './types';

ChartJS.register(...registerables);

interface ParseDataOptions {
  color?: string
}

const parseData = (data: NumericDataProp, options: ParseDataOptions = {}): ChartData<'bar', number[], string> => {
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
          backgroundColor: options?.color ?? uniqolor(key, { format: 'rgb' }).color
        };
      })
    };
  }

  return {
    labels: keys,
    datasets: [{
      label: '',
      data: values,
      backgroundColor: (values as number[]).map((value) => options?.color ?? uniqolor(value, { format: 'rgb' }).color)
    }]
  };
};

interface Props {
  id: string
  data: NumericDataProp
  yTitle?: string
  xTitle?: string
  showLegend?: boolean
  color?: string
}

export const BarChart: React.FC<Props> = ({ id, data, yTitle, xTitle, showLegend, color }) => {
  const options: ChartOptions<'bar'> = {
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
      data={parseData(data, { color })}
      options={options}
      key={id}
      datasetIdKey={id}
      id={id}
      redraw={false}
    />
  );
};
