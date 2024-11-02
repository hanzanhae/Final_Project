import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ConceptChart = ({ data }) => {
  const gatheringLabels = {
    EVENING_RUNNING: '퇴근런닝',
    GOINMUL: '고인물',
    HEALTH: '건강',
    MARATHON: '마라톤',
    MORNING_RUNNING: '모닝런닝',
    RUNLINI: '런린이'
  };

  const chartData = {
    labels: data.map((item) => gatheringLabels[item.gathering]),
    datasets: [
      {
        label: '컨셉별 모임 분포',
        data: data.map((item) => item.count),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(201, 203, 207, 0.6)'
        ],
        // borderColor: [
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        //   'rgba(255, 205, 86, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(201, 203, 207, 1)'
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
          boxWidth: 20, // 레이블 색상 상자의 너비 조정
          padding: 15
        },
        align: 'start', // 레이블을 왼쪽에 정렬
        maxWidth: 600 // 최대 너비 설정
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

export default ConceptChart;
