import React from 'react';
import styled from 'styled-components';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaBell,
  FaCalendarAlt
} from 'react-icons/fa';
import { mockMeetings } from '../../data/mockMeetings';

const renderMeetingIcon = (meetingType) => {
  if (meetingType === 'attended') return <FaCheckCircleIcon />;
  if (meetingType === 'missed') return <FaTimesCircleIcon />;
  if (meetingType === 'upcoming') return <FaBellIcon />;
  if (meetingType === 'event') return <FaCalendarAltIcon />;
  return null;
};

const Days = ({ day, currentMonth, isHoliday }) => {
  const getMeetingTypeForDay = (day) => {
    const dateToCheck = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const meeting = mockMeetings.find((meeting) => {
      const meetingDate = new Date(meeting.date);
      return (
        meetingDate.getDate() === dateToCheck.getDate() &&
        meetingDate.getMonth() === dateToCheck.getMonth() &&
        meetingDate.getFullYear() === dateToCheck.getFullYear()
      );
    });
    return meeting ? meeting.type : null; // meeting이 null이 아닐 경우 type 반환
  };

  const isToday =
    day === new Date().getDate() &&
    currentMonth.getMonth() === new Date().getMonth() &&
    currentMonth.getFullYear() === new Date().getFullYear();

  const meetingType = getMeetingTypeForDay(day); // 모임 상태 가져오기
  console.log(`Day: ${day}, Meeting Type: ${meetingType}`);

  return (
    <DaysContainer>
      {isToday ? (
        <TodayDate>{day}</TodayDate>
      ) : isHoliday ? (
        <HolidayDate>{day}</HolidayDate>
      ) : (
        <DaysDate>{day}</DaysDate>
      )}
      <IconContainer>{renderMeetingIcon(meetingType)}</IconContainer>
    </DaysContainer>
  );
};

export default Days;

const DaysContainer = styled.div`
  width: 14.28%;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  position: relative;
`;

const DaysDate = styled.div``;

const TodayDate = styled(DaysDate)`
  font-size: 1.5rem;
`;

const HolidayDate = styled.div`
  width: 14.28%;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  color: red;
`;

const IconContainer = styled.div`
  position: absolute; /* 절대 위치 */
  top: 50%; /* 세로 중앙 */
  left: 50%; /* 가로 중앙 */
  transform: translate(-50%, -50%); /* 중앙 정렬 */
`;

const FaCheckCircleIcon = styled(FaCheckCircle)`
  color: #83c5be;
  font-size: 20px;
  margin-top: 5px;
`;

const FaTimesCircleIcon = styled(FaTimesCircle)`
  color: #ff0054;
  font-size: 20px;
  margin-top: 5px;
`;

const FaBellIcon = styled(FaBell)`
  color: #ffbe0b;
  font-size: 20px;
  margin-top: 5px;
`;

const FaCalendarAltIcon = styled(FaCalendarAlt)`
  color: #83c5;
  font-size: 20px;
  margin-top: 5px;
`;
