import { CalendarOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';

const InfoTime = ({ meet }) => {
  const content = meet.content;
  const newDate = format(content.appointed_at, 'MM월 dd일');
  const newTime = format(content.appointed_at, 'HH시 mm분');

  return (
    <TimeWrapper>
      <Title>모임시간</Title>
      <TimeBox>
        <Icon />
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
  font-size: 1.5rem;
  color: #333;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
`;
const TimeBox = styled.div`
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media (max-width: 1440px) {
    border-width: 1.5px;
  }
`;
const Date = styled.p`
  font-size: 1.2rem;
  @media (max-width: 1440px) {
    font-size: 1rem;
  }
`;
const Time = styled.p`
  font-size: 1.2rem;
  @media (max-width: 1440px) {
    font-size: 1rem;
  }
`;
const Icon = styled(CalendarOutlined)`
  color: ${({ theme }) => theme.pointColor};
  font-size: 1.5rem;
  @media (max-width: 1440px) {
    font-size: 1rem;
  }
`;
