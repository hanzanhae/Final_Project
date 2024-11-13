import React from 'react';
import { Bar } from 'react-chartjs-2';

const ParticipantsChart = ({ data }) => {
  const chartData = {
    labels: Array.isArray(data.labels) ? data.labels : [],
    datasets: [
      {
        label: '월별 이벤트 참가자 수',
        data: Array.isArray(data.values) ? data.values : [],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  return <Bar data={chartData} options={{ responsive: true }} />;
};

export default ParticipantsChart;
