import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSider from '../components/admin/AdminSider';

import { AdminLayout, ContentLayout } from '../styles/adminStyle';

const Admin = () => {
  return (
    <AdminLayout>
      <AdminSider />
      <ContentLayout>
        <Outlet />
      </ContentLayout>
    </AdminLayout>
  );
};

export default Admin;
