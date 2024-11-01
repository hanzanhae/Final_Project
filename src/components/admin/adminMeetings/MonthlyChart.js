import React from 'react';
import { Line } from 'react-chartjs-2';

const MonthlyChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: '월별 모임 개설 수',
        data: data.map((item) => item.count),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      }
    ]
  };

  return (
    <Line
      data={chartData}
      options={{ responsive: true }}
      width={300}
      height={250}
    />
  );
};

export default MonthlyChart;
