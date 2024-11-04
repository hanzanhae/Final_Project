import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from 'antd';

const EventsChart = ({ data }) => {
  const eventsChartData = {
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

  return (
    <Card title="🆕 월별 이벤트 개설 수">
      <Line
        data={eventsChartData}
        options={{ responsive: true }}
        height={250}
      />
    </Card>
  );
};

export default EventsChart;
