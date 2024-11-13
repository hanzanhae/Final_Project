// Admin.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSider from '../components/admin/AdminSider';
import styled from 'styled-components';

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AdminLayout>
      <AdminSider collapsed={collapsed} setCollapsed={setCollapsed} />
      <ContentLayout $collapsed={collapsed}>
        <Outlet />
      </ContentLayout>
    </AdminLayout>
  );
};

export default Admin;

// 스타일 컴포넌트
const AdminLayout = styled.div`
  display: flex;
  min-height: 100vh;
  /* padding-top: 8vh; */
`;

const ContentLayout = styled.div`
  margin-left: ${({ $collapsed }) => ($collapsed ? '80px' : '200px')};
  transition: margin-left 0.2s ease;
  padding: 20px;
  width: 100%;
  background-color: #f0f2f5;
  min-height: 100vh;
`;
