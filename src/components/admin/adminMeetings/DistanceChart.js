import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const DistanceChart = ({ data }) => {
  const distanceOrder = [
    'THREE_KM',
    'FIVE_KM',
    'FIFTEEN_KM',
    'HALF_MARATHON',
    'FULL_MARATHON',
    'FREE'
  ];
  const distanceLabels = {
    THREE_KM: '3km',
    FIVE_KM: '5km',
    FIFTEEN_KM: '15km',
    HALF_MARATHON: '21.0975km',
    FULL_MARATHON: '42.195km',
    FREE: 'Free'
  };

  const sortedData = distanceOrder.map((key) => {
    return (
      data.find((item) => item.gathering === key) || {
        gathering: key,
        count: 0
      }
    );
  });

  const chartData = {
    labels: sortedData.map((item) => distanceLabels[item.gathering]),
    datasets: [
      {
        label: '거리별 모임 분포',
        data: sortedData.map((item) => item.count),
        backgroundColor: [
          'rgba(135, 206, 250, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 71, 0.6)',
          'rgba(255, 120, 0, 0.6)',
          'rgba(102, 205, 170, 0.6)',
          'rgba(147, 112, 219, 0.6)'
        ],
        // borderColor: [
        //   'rgba(100, 180, 230, 1)',
        //   'rgba(220, 180, 70, 1)',
        //   'rgba(200, 70, 50, 1)',
        //   'rgba(220, 90, 0, 1)',
        //   'rgba(80, 175, 140, 1)',
        //   'rgba(120, 90, 170, 1)'
        // ],
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 20,
          padding: 15
        },
        align: 'start'
      },
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (acc, cur) => acc + cur,
            0
          );
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        color: '#fff',
        font: {
          weight: 'bold',
          size: 12
        }
      }
    }
  };

  return (
    <div style={{ height: '450px', width: '100%' }}>
      <Doughnut
        data={chartData}
        options={chartOptions}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
};

export default DistanceChart;
