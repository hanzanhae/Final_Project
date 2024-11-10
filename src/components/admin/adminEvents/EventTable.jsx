import React from 'react';
import { Table, Button, Tag, Pagination } from 'antd';

const EventsTable = ({
  events,
  loading,
  currentPage,
  totalEvents,
  onPageChange,
  onAction
}) => {
  const columns = [
    { title: '이벤트명', dataIndex: 'title', key: 'title' },
    {
      title: '날짜',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => date.split('T')[0]
    },
    { title: '장소', dataIndex: 'address_name', key: 'address_name' },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag
          color={
            status === 'APPROVED'
              ? 'green'
              : status === 'PENDING'
                ? 'orange'
                : 'red'
          }
        >
          {status}
        </Tag>
      )
    },
    {
      title: '액션',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button
            type="primary"
            onClick={() =>
              onAction(record.event_gathering_id, 'approve', record.email)
            }
            disabled={record.status === 'APPROVED'}
            style={{ marginRight: 8 }}
          >
            승인
          </Button>
          <Button
            type="danger"
            onClick={() =>
              onAction(record.event_gathering_id, 'reject', record.email)
            }
            disabled={record.status === 'REJECTED'}
          >
            거절
          </Button>
        </span>
      )
    }
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={events}
        rowKey="event_gathering_id"
        loading={loading}
        pagination={false}
      />
      <Pagination
        current={currentPage}
        total={totalEvents}
        pageSize={5}
        onChange={onPageChange}
        style={{ marginTop: 20, textAlign: 'center' }}
      />
    </>
  );
};

export default EventsTable;
