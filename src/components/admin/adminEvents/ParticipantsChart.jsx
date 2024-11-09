import React from 'react';
import { Bar } from 'react-chartjs-2';

const ParticipantsChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: '월별 이벤트 참가자 수',
        data: data.map((item) => item.count),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  return <Bar data={chartData} options={{ responsive: true }} />;
};

export default ParticipantsChart;
