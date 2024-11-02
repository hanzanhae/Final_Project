import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const DistanceChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.distance),
    datasets: [
      {
        label: '거리별 모임 분포',
        data: data.map((item) => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (acc, cur) => acc + cur,
            0
          );
          return `${((value / total) * 100).toFixed(1)}%`;
        },
        color: '#fff',
        font: { weight: 'bold', size: 12 }
      }
    }
  };

  return (
    <Doughnut
      data={chartData}
      options={options}
      plugins={[ChartDataLabels]}
      width={300}
      height={250}
    />
  );
};

export default DistanceChart;
