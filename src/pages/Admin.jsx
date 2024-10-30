import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; // Outlet을 사용하여 하위 페이지 렌더링
import AdminSider from '../components/admin/AdminSider';

import { AdminLayout, ContentLayout } from '../styles/adminStyle'; // 스타일 import

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AdminLayout>
      <AdminSider collapsed={collapsed} setCollapsed={setCollapsed} />
      <ContentLayout collapsed={collapsed}>
        <Outlet />
      </ContentLayout>
    </AdminLayout>
  );
};

export default Admin;
