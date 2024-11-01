import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const RegionalChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.region),
    datasets: [
      {
        label: '지역별 모임 분포',
        data: data.map((item) => item.count),
        backgroundColor: 'rgba(153, 102, 255, 0.6)'
      }
    ]
  };

  const options = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      datalabels: {
        align: 'end',
        anchor: 'end',
        color: '#555',
        font: { weight: 'bold' },
        formatter: (value) => `${value}명`
      }
    }
  };

  return (
    <Bar
      data={chartData}
      options={options}
      plugins={[ChartDataLabels]}
      width={300}
      height={250}
    />
  );
};

export default RegionalChart;
