import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card } from 'antd';

const ParticipantsChart = ({ data }) => {
  const participantsChartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: '월별 이벤트 참가자 수',
        data: data.map((item) => item.count),
        backgroundColor: 'rgba(153, 102, 255, 0.6)'
      }
    ]
  };

  return (
    <Card title="👥 월별 이벤트 참가자 수">
      <Bar
        data={participantsChartData}
        options={{ responsive: true }}
        height={250}
      />
    </Card>
  );
};

export default ParticipantsChart;
