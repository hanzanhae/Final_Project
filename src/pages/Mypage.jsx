import React, { useState } from 'react';
import styled from 'styled-components';
import MyProfile from '../components/mypage/MyProfile';
import MyMeetings from '../components/mypage/MyProfile';
import MyEvents from '../components/mypage/MyProfile';

const Mypage = () => {
  const [activeMenu, setActiveMenu] = useState('profile'); // 기본값을 'profile'로 설정

  return (
    <div style={{ marginTop: '10vh' }}>
      <Container>
        {/* 사이드바 */}
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
    </div>
  );
};

//스타일
const Container = styled.div`
  display: flex;
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
  margin-bottom: 20px;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? '#007BFF' : '#000')};
`;

export default Mypage;
