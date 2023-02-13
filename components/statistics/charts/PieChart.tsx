import React from 'react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  Tooltip
} from 'chart.js';
import uniqolor from 'uniqolor';

ChartJS.register(
  ArcElement,
  Legend,
  Tooltip
);

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: true
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

const PieChart: React.FC<Props> = ({ id, data }) => {
  return (
    <Chart
      type="pie"
      data={parseData(data)}
      options={options}
      key={id}
      datasetIdKey={id}
      id={id}
      redraw={false}
    />
  );
};

export default PieChart;
