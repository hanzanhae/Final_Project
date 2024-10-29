// import React, { useEffect, useState } from 'react';
// import { Table, Button, message, Card } from 'antd';
// import axios from '../../api/instance';

// const AdminUsers = () => {
//   const [blacklistUsers, setBlacklistUsers] = useState([]);
//   const [reportedUsers, setReportedUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchData = async (userType, setData) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`/admin/user?user=${userType}`);
//       setData(response.data);
//     } catch (error) {
//       console.error(`오류: ${userType} 회원 데이터를 가져오는 중`, error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData('blacklist-user', setBlacklistUsers);
//     fetchData('reported-user', setReportedUsers);
//   }, []);

//   const handleRelease = async (user_id) => {
//     try {
//       await axios.patch(`/admin/${user_id}/release`);
//       message.success('블랙리스트 해제');
//       setBlacklistUsers(blacklistUsers.filter((user) => user.id !== user_id));
//     } catch (error) {
//       console.error('오류: 회원 해제 중', error);
//       message.error('해제 중 오류 발생');
//     }
//   };

//   const columns = [
//     {
//       title: '닉네임',
//       dataIndex: 'nickname',
//       key: 'nickname'
//     },
//     {
//       title: '이메일',
//       dataIndex: 'email',
//       key: 'email'
//     },
//     {
//       title: '액션',
//       key: 'action',
//       render: (_, record) => (
//         <Button type="primary" onClick={() => handleRelease(record.id)}>
//           해제
//         </Button>
//       )
//     }
//   ];

//   const reportedColumns = [
//     {
//       title: '닉네임',
//       dataIndex: 'nickname',
//       key: 'nickname'
//     },
//     {
//       title: '이메일',
//       dataIndex: 'email',
//       key: 'email'
//     },
//     {
//       title: '신고 횟수',
//       dataIndex: 'reportCount',
//       key: 'reportCount',
//       render: (text) => <span style={{ color: text >= 3 ? 'red' : 'orange' }}>{text}</span>
//     }
//   ];

//   return (
//     <div style={{ padding: '40px' }}>
//       <h1>회원 관리</h1>

//       <Card title="⛔ 블랙리스트 회원" style={{ marginBottom: '20px' }}>
//         <Card type="inner" title="블랙리스트 회원 목록">
//           <Table
//             columns={columns}
//             dataSource={blacklistUsers}
//             rowKey="id"
//             loading={loading}
//             pagination={false}
//           />
//         </Card>
//       </Card>

//       <Card title="📋 신고 받은 회원">
//         <Card type="inner" title="신고된 회원 목록">
//           <Table
//             columns={reportedColumns}
//             dataSource={reportedUsers}
//             rowKey="id"
//             loading={loading}
//             pagination={false}
//           />
//         </Card>
//       </Card>
//     </div>
//   );
// };

// export default AdminUsers;

import React, { useEffect, useState } from 'react';
import { Table, Button, message, Card } from 'antd';

const AdminUsers = () => {
  const [blacklistUsers, setBlacklistUsers] = useState([]);
  const [reportedUsers, setReportedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 더미 데이터 설정
    setLoading(true);
    setTimeout(() => {
      setBlacklistUsers([
        { id: 1, nickname: 'User1', email: 'user1@example.com' },
        { id: 2, nickname: 'User2', email: 'user2@example.com' }
      ]);

      setReportedUsers([
        { id: 3, nickname: 'User3', email: 'user3@example.com', reportCount: 1 },
        { id: 4, nickname: 'User4', email: 'user4@example.com', reportCount: 3 }
      ]);
      setLoading(false);
    }, 500); // 로딩 상태 확인을 위한 임시 딜레이
  }, []);

  const handleRelease = (user_id) => {
    message.success(`블랙리스트 해제: User ${user_id}`);
    setBlacklistUsers(blacklistUsers.filter((user) => user.id !== user_id));
  };

  const columns = [
    {
      title: '닉네임',
      dataIndex: 'nickname',
      key: 'nickname'
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '액션',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleRelease(record.id)}>
          해제
        </Button>
      )
    }
  ];

  const reportedColumns = [
    {
      title: '닉네임',
      dataIndex: 'nickname',
      key: 'nickname'
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '신고 횟수',
      dataIndex: 'reportCount',
      key: 'reportCount',
      render: (text) => <span style={{ color: text >= 3 ? 'red' : 'orange' }}>{text}</span>
    }
  ];

  return (
    <div style={{ padding: '40px' }}>
      <h1>회원 관리</h1>

      <Card title="⛔ 블랙리스트 회원" style={{ marginBottom: '20px' }}>
        <Card type="inner" title="블랙리스트 회원 목록">
          <Table
            columns={columns}
            dataSource={blacklistUsers}
            rowKey="id"
            loading={loading}
            pagination={false}
          />
        </Card>
      </Card>

      <Card title="📋 신고 받은 회원">
        <Card type="inner" title="신고된 회원 목록">
          <Table
            columns={reportedColumns}
            dataSource={reportedUsers}
            rowKey="id"
            loading={loading}
            pagination={false}
          />
        </Card>
      </Card>
    </div>
  );
};

export default AdminUsers;
