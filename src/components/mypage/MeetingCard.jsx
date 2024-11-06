import React from 'react';
import styled from 'styled-components';

const MeetingCard = ({ meeting, onCompleteClick }) => (
  <Card>
    <h3>{meeting.name}</h3>
    <p>{meeting.date}</p>
    <p>{meeting.location}</p>
    {meeting.isCreatedByUser && (
      <CompleteButton onClick={onCompleteClick}>러닝 완료</CompleteButton>
    )}
  </Card>
);

//스타일
const Card = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const CompleteButton = styled.button`
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.pointColor};
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
`;

export default MeetingCard;
