import React from 'react';
import { Line } from 'react-chartjs-2';

const preprocessMonthlyData = (data) => {
  const monthlyCounts = data.reduce((acc, item) => {
    const month = `${parseInt(item.month.split('-')[1], 10)}월`;
    acc[month] = (acc[month] || 0) + item.count;
    return acc;
  }, {});

  return {
    labels: Object.keys(monthlyCounts),
    values: Object.values(monthlyCounts)
  };
};

const EventsChart = ({ data }) => {
  const chartData = preprocessMonthlyData(data);
  const chartConfig = {
    labels: chartData.labels,
    datasets: [
      {
        label: '월별 이벤트 개설 수',
        data: chartData.values,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true
      }
    ]
  };

  return <Line data={chartConfig} options={{ responsive: true }} />;
};

export default EventsChart;
