import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';

const MeetingCard = ({ meeting, onCompleteClick }) => (
  <Card>
    <h3>{meeting.title}</h3>
    <p>
      <Span>모임날짜</Span>
      {format(meeting.appointed_at, 'yyyy-MM-dd')}
    </p>
    <p>
      <Span>마감날짜</Span>
      {format(meeting.deadline, 'yyyy-MM-dd')}
    </p>
    <p>
      <Span>모임장소</Span>
      {meeting.location.address_names.address_name}
    </p>
    {onCompleteClick && (
      <CompleteButton onClick={onCompleteClick}>런닝완료</CompleteButton>
    )}
  </Card>
);

//스타일
const Card = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  position: relative;
`;

const CompleteButton = styled.button`
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.pointColor};
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  position: absolute;
  top: 0.5rem;
  right: 1rem;
`;

const Span = styled.span`
  margin-right: 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
`;

export default MeetingCard;
