import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ConceptChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.concept),
    datasets: [
      {
        label: '컨셉별 모임 분포',
        data: data.map((item) => item.count),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)'
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

export default ConceptChart;
