import React from 'react';
import { Table } from 'antd';

const ReportedTable = ({ data, loading }) => {
  const columns = [
    {
      title: '닉네임',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center'
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
      align: 'center'
    },
    {
      title: '신고 받은 횟수',
      dataIndex: 'penalty',
      key: 'penalty',
      align: 'center',
      render: (penalty) => (
        <span
          style={{ color: penalty >= 3 ? 'red' : 'orange', fontWeight: 'bold' }}
        >
          {penalty}
        </span>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={Array.isArray(data) ? data : []}
      rowKey="nickname"
      loading={loading}
      pagination={false}
    />
  );
};

export default ReportedTable;
