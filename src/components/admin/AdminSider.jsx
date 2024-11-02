import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { Sider, MenuWrapper } from '../../styles/adminStyle';

const AdminSider = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('');

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

  const items = [
    { label: '홈', key: 'home', icon: <HomeOutlined /> },
    { label: '회원 관리', key: 'users', icon: <UserOutlined /> },
    { label: '모임 관리', key: 'meetings', icon: <TeamOutlined /> },
    { label: '이벤트 관리', key: 'events', icon: <CalendarOutlined /> }
  ];

  return (
    <Sider>
      <MenuWrapper>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleMenuClick(key)}
          theme="dark"
          items={items}
        />
      </MenuWrapper>
    </Sider>
  );
};

export default AdminSider;
