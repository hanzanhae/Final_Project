import { CalendarOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';

const InfoTime = ({ meet }) => {
  // const content = meet.content;
  // const newDate = format(content.appointed_at, 'MM월 dd일');
  // const newTime = format(content.appointed_at, 'HH시 mm분');
  //
  const newDate = format(meet.appointed_at, 'MM월 dd일');
  const newTime = format(meet.appointed_at, 'HH시 mm분');

  return (
    <TimeWrapper>
      <Title>모임시간</Title>
      <TimeBox>
        <Icon>
          <CalendarOutlined />
        </Icon>
        <Date>{newDate}</Date>
        <Time>{newTime}</Time>
      </TimeBox>
    </TimeWrapper>
  );
};

export default InfoTime;

// style
const TimeWrapper = styled.div`
  margin-bottom: 2rem;
`;
const Title = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: #333;
`;
const TimeBox = styled.div`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Date = styled.p``;
const Time = styled.p``;
const Icon = styled.div`
  width: 1rem;
  color: #ccc;
`;
