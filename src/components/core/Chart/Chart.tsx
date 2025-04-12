'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import type { ApexOptions } from 'apexcharts';
import { CandleData, ChartProps } from './Chart.types';

// Lazy-load ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const Chart: React.FC<ChartProps> = ({ type, data, color }) => {
  const { options, series, height } = useMemo(() => {
    let chartSeries;
    let chartOptions: ApexOptions;
    let chartHeight = 100; // default height for line charts with candle-format

    const isCandleFormat = type === 'line' && typeof data[0] === 'object' && 'usd' in data[0];

    if (type === 'line') {
      if (isCandleFormat) {
        const candleData = data as CandleData[];
        const baseUsd = candleData[0].usd.close;

        const lineDataUSD = candleData.map((item) => ({
          x: item.date,
          y: item.usd.close - baseUsd,
        }));

        const yValues = lineDataUSD.map((p) => p.y);
        const minY = Math.min(...yValues) - 5;
        const maxY = Math.max(...yValues) + 5;

        const isDowntrend = lineDataUSD.at(-1)!.y < lineDataUSD[0].y;
        const lineColor = isDowntrend ? '#FF3440' : color ?? '#CDFF00';

        chartSeries = [{ name: 'USD', data: lineDataUSD }];

        chartOptions = {
          chart: {
            type: 'line',
            height: 90,
            toolbar: { show: false },
            zoom: { enabled: false },
          },
          stroke: {
            curve: 'smooth',
            width: 2,
            colors: [lineColor],
          },
          xaxis: {
            type: 'datetime',
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false },
          },
          yaxis: {
            show: false,
            min: minY,
            max: maxY,
          },
          grid: { show: false },
          tooltip: {
            theme: 'dark',
            x: { format: 'dd MMM yyyy HH:mm' },
          },
        };

        chartHeight = 100;
      } else {
        // Simple number[] data
        const base = (data as number[])[0];
        const lineData = (data as number[]).map((value, index) => ({
          x: Date.now() - (data.length - index) * 60000,
          y: value - base,
        }));

        const isDowntrend = lineData.at(-1)!.y < lineData[0].y;
        const lineColor = isDowntrend ? '#FF3440' : color ?? '#CDFF00';

        chartSeries = [{ name: 'Price', data: lineData }];

        chartOptions = {
          chart: {
            type: 'line',
            height: 90,
            toolbar: { show: false },
            zoom: { enabled: false },
          },
          stroke: {
            curve: 'smooth',
            width: 2,
            colors: [lineColor],
          },
          xaxis: {
            type: 'datetime',
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false },
          },
          yaxis: { show: false },
          grid: { show: false },
          tooltip: {
            enabled: false
          },
        };

        chartHeight = 90;
      }
    } else {
      // Candlestick chart
      const candleData = data as CandleData[];

      chartSeries = [
        {
          name: 'Candlestick',
          data: candleData.map((item) => ({
            x: item.date,
            y: [item.usd.open, item.usd.high, item.usd.low, item.usd.close],
          })),
        },
      ];

      chartOptions = {
        chart: {
          type: 'candlestick',
          height: 350,
          toolbar: { show: false },
        },
        xaxis: {
          type: 'datetime',
          labels: { show: false },
          axisBorder: { show: false },
          axisTicks: { show: false },
        },
        yaxis: {
          labels: {
            formatter: (value: number) => `$${value.toLocaleString()}`,
            style: { colors: '#FFFFFF80' },
          },
          opposite: true,
          axisBorder: { show: false },
          axisTicks: { show: false },
        },
        tooltip: {
          theme: 'dark',
          x: { format: 'dd MMM yyyy HH:mm' },
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: '#CDFF00',
              downward: '#FF3440',
            },
            wick: {
              useFillColor: true,
            },
          },
        },
      };

      chartHeight = 350;
    }

    return { options: chartOptions, series: chartSeries, height: chartHeight };
  }, [type, data, color]);

  return (
    <div className="w-full">
      <ReactApexChart
        options={options}
        series={series}
        type={type}
        height={height}
      />
    </div>
  );
};
