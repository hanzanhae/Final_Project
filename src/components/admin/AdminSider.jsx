import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const AdminSider = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = (key) => {
    navigate(`/admin/${key}`);
  };

  const items = [
    { label: '홈', key: 'home', icon: <HomeOutlined /> },
    { label: '회원 관리', key: 'users', icon: <UserOutlined /> },
    { label: '모임 관리', key: 'meetings', icon: <TeamOutlined /> },
    { label: '이벤트 관리', key: 'events', icon: <CalendarOutlined /> }
  ];

  return (
    <SiderWrapper $collapsed={collapsed}>
      {' '}
      <MenuWrapper>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname.split('/')[2]]}
          onClick={({ key }) => handleMenuClick(key)}
          theme="dark"
          items={items}
          inlineCollapsed={collapsed}
        />
      </MenuWrapper>
      <CollapseButton onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <RightOutlined /> : <LeftOutlined />}
      </CollapseButton>
    </SiderWrapper>
  );
};

export default AdminSider;

const SiderWrapper = styled.div`
  width: ${({ $collapsed }) =>
    $collapsed ? '80px' : '200px'}; /* $collapsed 사용 */
  position: fixed;
  top: 8vh;
  left: 0;
  bottom: 0;
  background-color: #001529;
  transition: width 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1000;
`;

const MenuWrapper = styled.div`
  flex-grow: 1;
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 1.2rem;
  padding: 10px;
  align-self: center;
  margin-bottom: 10px;
`;
