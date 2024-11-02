import React, { useState } from 'react';
import styled from 'styled-components';
import MyMeetings from '../components/mypage/MyMeetings';
import MyProfile from '../components/mypage/MyProfile';
import MyEvents from '../components/mypage/MyEvents';

const Mypage = () => {
  const [activeMenu, setActiveMenu] = useState('profile');

  return (
    <Container>
      <Sidebar>
        <MenuItem active={activeMenu === 'profile'} onClick={() => setActiveMenu('profile')}>
          내 프로필
        </MenuItem>
        <MenuItem active={activeMenu === 'meetings'} onClick={() => setActiveMenu('meetings')}>
          내 모임
        </MenuItem>
        <MenuItem active={activeMenu === 'events'} onClick={() => setActiveMenu('events')}>
          내 이벤트
        </MenuItem>
        <MenuItem active={activeMenu === 'calendar'} onClick={() => setActiveMenu('calendar')}>
          런닝 달력
        </MenuItem>
      </Sidebar>

      <Content>
        {activeMenu === 'profile' && <MyProfile />}
        {activeMenu === 'meetings' && <MyMeetings />}
        {activeMenu === 'events' && <MyEvents />}
        {/* {activeMenu === 'calendar' && <RunningCalendar />} */}
      </Content>
    </Container>
  );
};

//스타일
const Container = styled.div`
  display: flex;
  margin-top: 10vh;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #f4f4f4;
  height: 100vh;
  padding: 20px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const MenuItem = styled.div`
  font-size: 1rem;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? ({ theme }) => theme.pointColor : '#333')};
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

export default Mypage;
