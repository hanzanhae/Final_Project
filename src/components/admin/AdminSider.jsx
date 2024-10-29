import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { Sider, CollapseButton } from '../../styles/adminStyle';

const AdminSider = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('');
  const [collapsed, setCollapsed] = useState(
    JSON.parse(localStorage.getItem('siderCollapsed')) || false
  );

  useEffect(() => {
    if (location.pathname.startsWith('/admin/home')) {
      setSelectedKey('home');
    } else if (location.pathname.startsWith('/admin/users')) {
      setSelectedKey('users');
    } else if (location.pathname.startsWith('/admin/meetings')) {
      setSelectedKey('meetings');
    } else if (location.pathname.startsWith('/admin/events')) {
      setSelectedKey('events');
    }
  }, [location.pathname]);

  const handleMenuClick = (key) => {
    setSelectedKey(key);
    switch (key) {
      case 'home':
        navigate('/admin/home');
        break;
      case 'users':
        navigate('/admin/users');
        break;
      case 'meetings':
        navigate('/admin/meetings');
        break;
      case 'events':
        navigate('/admin/events');
        break;
      default:
        break;
    }
  };

  const toggleCollapsed = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    localStorage.setItem('siderCollapsed', JSON.stringify(newCollapsed));
  };

  return (
    <Sider collapsed={collapsed}>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={({ key }) => handleMenuClick(key)}
        theme="dark"
        style={{
          borderRight: 0,
          backgroundColor: 'inherit',
          color: '#fff'
        }}
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          홈
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />}>
          회원 관리
        </Menu.Item>
        <Menu.Item key="meetings" icon={<TeamOutlined />}>
          모임 관리
        </Menu.Item>
        <Menu.Item key="events" icon={<CalendarOutlined />}>
          이벤트 관리
        </Menu.Item>
      </Menu>

      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CollapseButton onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </CollapseButton>
      </div>
    </Sider>
  );
};

export default AdminSider;
