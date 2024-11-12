import React from 'react';
import { Bar } from 'react-chartjs-2';

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

const ParticipantsChart = ({ data }) => {
  const chartData = preprocessMonthlyData(data);
  const chartConfig = {
    labels: chartData.labels,
    datasets: [
      {
        label: '월별 이벤트 참가자 수',
        data: chartData.values,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  return <Bar data={chartConfig} options={{ responsive: true }} />;
};

export default ParticipantsChart;
