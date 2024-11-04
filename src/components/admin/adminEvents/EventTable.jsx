import React from 'react';
import { Table, Button, Card } from 'antd';

const EventTable = ({ data, loading, onAction }) => {
  const columns = [
    { title: '이벤트명', dataIndex: 'name', key: 'name' },
    { title: '날짜', dataIndex: 'date', key: 'date' },
    { title: '장소', dataIndex: 'location', key: 'location' },
    { title: '인원', dataIndex: 'participants', key: 'participants' },
    {
      title: '액션',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button
            type="primary"
            onClick={() => onAction(record.id, 'approve')}
            style={{ marginRight: '8px' }}
          >
            승인
          </Button>
          <Button type="danger" onClick={() => onAction(record.id, 'reject')}>
            거부
          </Button>
        </span>
      )
    }
  ];

  return (
    <Card title="📋 이벤트 목록">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={false}
      />
    </Card>
  );
};

export default EventTable;
