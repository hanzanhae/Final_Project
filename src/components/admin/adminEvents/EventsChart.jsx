import React from 'react';
import { Line } from 'react-chartjs-2';

const EventsChart = ({ data }) => {
  const chartData = {
    labels: Array.isArray(data.labels) ? data.labels : [],
    datasets: [
      {
        label: '월별 이벤트 개설 수',
        data: Array.isArray(data.values) ? data.values : [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true
      }
    ]
  };

  return <Line data={chartData} options={{ responsive: true }} />;
};

export default EventsChart;
