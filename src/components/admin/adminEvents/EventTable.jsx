import React from 'react';
import { Table, Button } from 'antd';

const EventsTable = ({ data, loading, onApprove, onReject }) => {
  const reportReasons = {
    ILLEGAL_CONTENT: '불법정보게시',
    HARASSMENT: '욕설/인신공격',
    OBSCENE_CONTENT: '음란성/선정성',
    REPEATED_POSTING: '같은내용 반복게시',
    NO_SHOW: '잦은노쇼'
  };

  const statusMap = {
    PENDING: '대기 중',
    REJECTED: '승인 거부',
    APPROVED: '승인됨'
  };

  const columns = [
    {
      title: '이벤트명',
      dataIndex: 'title',
      key: 'title',
      align: 'center'
    },
    {
      title: '날짜',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      render: (date) => date.split('T')[0]
    },
    {
      title: '장소',
      dataIndex: 'address_name',
      key: 'address_name',
      align: 'center'
    },
    {
      title: '신고 사유',
      dataIndex: 'report_reason',
      key: 'report_reason',
      align: 'center',
      render: (reason) => reportReasons[reason] || '사유 없음'
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => statusMap[status] || '알 수 없음'
    },
    {
      title: '승인 여부',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => onApprove(record.event_gathering_id, record.email)}
          >
            승인
          </Button>
          <Button
            type="danger"
            onClick={() => onReject(record.event_gathering_id, record.email)}
            style={{ marginLeft: 8 }}
          >
            거절
          </Button>
        </>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="event_gathering_id"
      loading={loading}
      pagination={false}
    />
  );
};

export default EventsTable;
