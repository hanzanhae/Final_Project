import React, { useState, useEffect } from 'react';
import { Tabs, message } from 'antd';
import axios from '../../../api/instance';
import BlacklistTable from './BlacklistTable';
import ReportedTable from './ReportedTable';

const AdminUsersPage = () => {
  const [blacklistUsers, setBlacklistUsers] = useState([]);
  const [reportedUsers, setReportedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (userType, setData) => {
    try {
      setLoading(true);
      const response = await axios.get(`/admin/user?user=${userType}`);
      setData(response.data);
    } catch (error) {
      console.error(`오류: ${userType} 회원 데이터를 가져오는 중`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('blacklist_user', setBlacklistUsers);
    fetchData('reported_user', setReportedUsers);
  }, []);

  const handleRelease = async (userId) => {
    try {
      await axios.patch(`/admin/${userId}/release`);
      message.success('블랙리스트 해제');
      setBlacklistUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('오류: 회원 해제 중', error);
      message.error('해제 중 오류 발생');
    }
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
      <Tabs items={tabItems} />
    </div>
  );
};

export default AdminUsersPage;
