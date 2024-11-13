import React from 'react';
import { Card } from 'antd';

const StatsCard = ({ title, count }) => (
  <Card title={title} bordered={false}>
    {count}
  </Card>
);

export default StatsCard;
