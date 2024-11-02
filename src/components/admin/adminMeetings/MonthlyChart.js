import React from 'react';
import { Line } from 'react-chartjs-2';

const MonthlyChart = ({ data }) => {
  const monthLabels = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ];

  const chartData = {
    labels: data.map(
      (item) => monthLabels[new Date(item.gathering).getMonth()]
    ),
    datasets: [
      {
        label: '월별 모임 개설 수',
        data: data.map((item) => item.count),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true
        }
      },
      y: {
        display: true,
        title: {
          display: true
        },
        beginAtZero: true
      }
    }
  };

  return (
    <div style={{ height: '450px', width: '100%' }}>
      {' '}
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MonthlyChart;
