import React, { useEffect, useState } from 'react';
import { Card, Tabs, message } from 'antd';
import axios from '../../../api/instance';
import BlacklistTable from './BlacklistTable';
import ReportedTable from './ReportedTable';

const AdminUsersPage = () => {
  const [blacklistUsers, setBlacklistUsers] = useState([]);
  const [reportedUsers, setReportedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [blacklistRes, reportedRes] = await Promise.all([
          axios.get('/admin/users?status=BANNED'),
          axios.get('/admin/users?status=REPORTED')
        ]);

        setBlacklistUsers(blacklistRes.data);
        setReportedUsers(reportedRes.data);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRelease = (nickname) => {
    setBlacklistUsers((prevUsers) =>
      prevUsers.filter((user) => user.nickname !== nickname)
    );
    message.success(`${nickname}님이 블랙리스트에서 해제되었습니다.`);
  };

  const tabItems = [
    {
      key: '1',
      label: '⛔ 블랙리스트 회원',
      children: (
        <BlacklistTable
          data={blacklistUsers}
          loading={loading}
          onRelease={handleRelease}
        />
      )
    },
    {
      key: '2',
      label: '📋 신고받은 회원',
      children: <ReportedTable data={reportedUsers} loading={loading} />
    }
  ];

  return (
    <div style={{ padding: '40px' }}>
      <h1>회원 관리</h1>
      <Card>
        <Tabs defaultActiveKey="1" items={tabItems} />
      </Card>
    </div>
  );
};

export default AdminUsersPage;
