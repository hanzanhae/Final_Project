import React from 'react';
import { Bar } from 'react-chartjs-2';

const RegionalChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.gathering.slice(0, 2)),
    datasets: [
      {
        label: '지역별 모임 분포',
        data: data.map((item) => item.count),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: 'top'
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#333',
        font: {
          weight: 'bold'
        },
        formatter: (value) => `${value}회`
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true
        },
        beginAtZero: true
      },
      y: {
        display: true,
        title: {
          display: true
        }
      }
    }
  };

  return (
    <div style={{ height: '450px', width: '100%' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default RegionalChart;
