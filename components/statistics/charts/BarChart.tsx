import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import uniqolor from 'uniqolor';

ChartJS.register(...registerables);

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    yAxis: {
      ticks: {
        display: true
      }
    },
    xAxis: {
      ticks: {
        display: false
      }
    }
  },
  elements: {
    point: {
      backgroundColor: 'hsl(171, 100%, 41%)',
      borderColor: 'hsl(171, 100%, 41%)',
      radius: 2,
      hoverRadius: 4
    },
    line: {
      borderColor: 'hsla(171, 100%, 41%, 50%)'
    }
  }
};

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
}

const BarChart: React.FC<Props> = ({ id, data }) => {
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
