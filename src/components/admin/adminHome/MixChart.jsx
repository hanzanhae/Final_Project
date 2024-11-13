import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(...registerables);

const MixChart = ({ newMembers, disabledMembers }) => {
  const mixedChartData = {
    labels: [
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
    ],
    datasets: [
      {
        type: 'line',
        label: '신규 가입자 수',
        data: newMembers,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false
      },
      {
        type: 'bar',
        label: '탈퇴 회원 수',
        data: disabledMembers,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const mixedChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    },
    scales: {
      x: { display: true, title: { display: true, text: '월별' } },
      y: {
        display: true,
        title: { display: true, text: '사용자 수' },
        beginAtZero: true
      }
    }
  };

  return (
    <ChartContainer>
      <Chart type="bar" data={mixedChartData} options={mixedChartOptions} />
    </ChartContainer>
  );
};

export default MixChart;

const ChartContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
