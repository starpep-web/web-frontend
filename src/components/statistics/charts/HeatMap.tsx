'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DEFAULT_SHOW_VALUES = true;
const DEFAULT_SHOW_TOOLBAR = false;
const DEFAULT_COLOR = '#276FB8';

const tooltipFormatter = ({ seriesIndex, dataPointIndex, w }: any) => {
  const cell = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
  return `<ul style="padding: 0.5rem;">${cell.tooltipText}</ul>`;
};

const parseData = (normalizedData: number[][], realData: number[][], xLabels: string[], yLabels: string[]): ApexOptions['series'] => {
  return normalizedData.map((normalizedRow, idx) => {
    const yLabel = yLabels[idx];
    const realRow = realData[idx];

    return {
      name: yLabel,
      data: normalizedRow.map((value, idx) => {
        const xLabel = xLabels[idx];
        const realValue = realRow[idx];

        return {
          x: xLabel,
          y: value,
          tooltipText: `${yLabel} -> ${xLabel}: ${realValue} (${value}%)`
        };
      })
    };
  }).reverse();
};

interface Props {
  id: string
  title?: string
  xLabels: string[]
  yLabels: string[]
  showValues?: boolean
  showToolbar?: boolean
  color?: string
  normalizedData: number[][]
  realData: number[][]
}

export const HeatMap: React.FC<Props> = ({
  id,
  title,
  xLabels,
  yLabels,
  showValues = DEFAULT_SHOW_VALUES,
  showToolbar = DEFAULT_SHOW_TOOLBAR,
  color = DEFAULT_COLOR,
  normalizedData,
  realData
}) => {
  const series = parseData(normalizedData, realData, xLabels, yLabels);

  const options: ApexOptions = {
    chart: {
      id,
      toolbar: {
        show: showToolbar
      }
    },
    dataLabels: {
      enabled: showValues
    },
    title: {
      text: title
    },
    xaxis: {
      categories: xLabels ?? []
    },
    colors: [color],
    plotOptions: {
      heatmap: {
        distributed: true
      }
    },
    tooltip: {
      custom: tooltipFormatter
    }
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="heatmap"
      width="100%"
      height="100%"
    />
  );
};
