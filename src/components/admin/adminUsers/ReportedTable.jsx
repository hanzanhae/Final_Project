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
      title: '신고받은 횟수',
      dataIndex: 'reportCount',
      key: 'reportCount',
      align: 'center',
      render: (text) => (
        <span style={{ color: text >= 3 ? 'red' : 'orange' }}>{text}</span>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={false}
    />
  );
};

export default ReportedTable;
