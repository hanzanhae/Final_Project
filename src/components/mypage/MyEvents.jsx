import React from 'react';
import styled from 'styled-components';
import EventRequestForm from './EventRequestForm'; // 이벤트 신청 폼 컴포넌트
import EventCard from './EventCard'; // 이벤트 카드 컴포넌트
import eventData from './mockdata';

const MyEvents = () => (
  <PageContainer>
    <Content>
      <Header>다가오는 이벤트</Header>
      {eventData.map((event) => (
        <EventCard
          key={event.id}
          name={event.name}
          date={event.date}
          location={event.location}
          participantCount={event.participantCount}
          signupDeadline={event.signupDeadline}
          status={event.status}
          imageUrl={event.imageUrl}
        />
      ))}
    </Content>

    <EventRequestForm />
  </PageContainer>
);

//스타일
const PageContainer = styled.div`
  display: flex;
  padding: 20px;
`;

const Header = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 8px;
  letter-spacing: 1px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

export default MyEvents;
