import React, { useState } from 'react';
import styled from 'styled-components';
import MyMeetings from '../components/mypage/MyMeetings';
import MyProfile from '../components/mypage/MyProfile';
import MyEvents from '../components/mypage/MyEvents';
import Calendar from '../components/calendar/Calendar';
import { Link } from 'react-router-dom';

const Mypage = () => {
  const [activeMenu, setActiveMenu] = useState('meetings');

  return (
    <Container>
      <Sidebar>
        {/* <MenuItem
          active={activeMenu === 'profile'}
          onClick={() => setActiveMenu('profile')}
        >
          내 프로필
        </MenuItem> */}
        <MenuItem
          active={activeMenu === 'meetings'}
          onClick={() => setActiveMenu('meetings')}
        >
          내 모임
        </MenuItem>
        <MenuItem
          active={activeMenu === 'events'}
          onClick={() => setActiveMenu('events')}
        >
          내 이벤트
        </MenuItem>
        <MenuItem
          active={activeMenu === 'calendar'}
          onClick={() => setActiveMenu('calendar')}
        >
          런닝 달력
        </MenuItem>
        <Link to="/admin">
          <AdminBtn>관리자</AdminBtn>
        </Link>
      </Sidebar>

      <Content>
        {/* {activeMenu === 'profile' && <MyProfile />} */}
        {activeMenu === 'meetings' && <MyMeetings />}
        {activeMenu === 'events' && <MyEvents />}
        {activeMenu === 'calendar' && <Calendar />}
      </Content>
    </Container>
  );
};

//스타일
const Container = styled.div`
  width: 100%;
  display: flex;
  padding-top: 8vh;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #f4f4f4;
  margin-top: 8vh;
  height: 92vh;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
`;

const Content = styled.div`
  width: calc(100% - 200px);
  flex: 1;
  padding: 20px;
  padding-left: 200px;
`;

const MenuItem = styled.div`
  font-size: 1rem;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) =>
    props.active ? ({ theme }) => theme.pointColor : '#333'};
  margin-bottom: 25px;
  cursor: pointer;
  padding: 15px 20px;
  width: 100%;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? '#e6f0ff' : 'transparent')};
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f2f5;
  }
`;

const AdminBtn = styled.button`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  color: #808080;
  font-weight: 600;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

export default Mypage;
