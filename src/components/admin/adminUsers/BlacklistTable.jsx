import React from 'react';
import { Table, Button, message } from 'antd';
import axios from '../../../api/instance';

const BlacklistTable = ({ data, loading, onUserReleased }) => {
  const handleRelease = async (userId) => {
    try {
      // admin/{user_id}/release에서 {user_id} 부분은 동적으로 해당 유저의 ID를 넣어야 함.
      // JavaScript 코드에서는 템플릿 리터럴을 사용해 /admin/${userId}/release로 작성.
      await axios.patch(`/admin/${userId}/release`);
      message.success('블랙리스트 해제 완료');
      onUserReleased(userId);
    } catch (error) {
      console.error('오류: 회원 해제 중', error);
      message.error('해제 중 오류 발생');
    }
  };

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
      title: '블랙리스트 해제',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleRelease(record.id)}>
          해제 승인
        </Button>
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

export default BlacklistTable;
