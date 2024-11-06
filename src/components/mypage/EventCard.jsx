import React from 'react';
import styled from 'styled-components';

const EventCard = ({
  name,
  date,
  location,
  status,
  participantCount,
  signupDeadline,
  imageUrl
}) => (
  <Card>
    <StatusBadge status={status}>{status}</StatusBadge>
    <EventName>{name}</EventName>
    <EventImage src={imageUrl} alt={`${name} 이미지`} />
    <EventDetails>날짜: {date}</EventDetails>
    <EventDetails>장소: {location}</EventDetails>
    <EventDetails>인원: {participantCount}</EventDetails>
    <EventDetails>등록 마감 날짜: {signupDeadline}</EventDetails>
  </Card>
);

//스타일
const Card = styled.div`
  position: relative;
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const EventName = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 5px;
`;

const EventDetails = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 4px;
`;

const StatusBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 12px;
  color: #fff;
  background-color: ${(props) =>
    props.status === '승인 완료'
      ? '#4caf50'
      : props.status === '승인 거부'
        ? '#f44336'
        : '#ff9800'};
`;

const EventImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 20px 0;
`;

export default EventCard;
