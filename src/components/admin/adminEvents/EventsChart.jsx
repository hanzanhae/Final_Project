import React from 'react';
import { Line } from 'react-chartjs-2';

const EventsChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: '월별 이벤트 개설 수',
        data: data.map((item) => item.count),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true
      }
    ]
  };

  return <Line data={chartData} options={{ responsive: true }} />;
};

export default EventsChart;
