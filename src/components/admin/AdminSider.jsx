import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'antd'; // Ant Design의 Sider 사용

const { Sider } = Layout; // Ant Design의 Sider 컴포넌트 사용

const AdminSider = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      style={{ height: '100vh', position: 'fixed', top: '8vh' }}
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={['/admin']}
        mode="inline"
        onClick={handleMenuClick}
      >
        <Menu.Item key="/admin" icon={<HomeOutlined />}>
          홈
        </Menu.Item>
        <Menu.Item key="/admin/users" icon={<UserOutlined />}>
          회원 관리
        </Menu.Item>
        <Menu.Item key="/admin/meetings" icon={<TeamOutlined />}>
          모임 관리
        </Menu.Item>
        <Menu.Item key="/admin/events" icon={<CalendarOutlined />}>
          이벤트 관리
        </Menu.Item>
        <Menu.Item key="/admin/reports" icon={<WarningOutlined />}>
          신고 처리
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminSider;
