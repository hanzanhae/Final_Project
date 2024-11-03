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

const Days = ({
  day,
  fullDate,
  isHoliday,
  isCurrentMonthDate,
  isPreviousMonth,
  isNextMonth,
  onDayClick,
  hasEvent
}) => {
  const getMeetingTypeForDay = (fullDate) => {
    const meeting = mockMeetings.find((meeting) => {
      const meetingDate = new Date(meeting.date);
      return (
        meetingDate.getDate() === fullDate.getDate() &&
        meetingDate.getMonth() === fullDate.getMonth() &&
        meetingDate.getFullYear() === fullDate.getFullYear()
      );
    });
    return meeting ? meeting.type : null;
  };

  const today = new Date();
  const isToday =
    fullDate.getDate() === today.getDate() &&
    fullDate.getMonth() === today.getMonth() &&
    fullDate.getFullYear() === today.getFullYear();

  const meetingType = getMeetingTypeForDay(fullDate);

  return (
    <DaysContainer onClick={() => onDayClick(fullDate)}>
      {isToday ? (
        meetingType ? (
          <TodayEventDate>{day}</TodayEventDate>
        ) : (
          <TodayDate>{day}</TodayDate>
        )
      ) : isHoliday ? (
        <HolidayDate>{day}</HolidayDate>
      ) : isPreviousMonth ? (
        <PreviousMonthDate>{day}</PreviousMonthDate>
      ) : isNextMonth ? (
        <NextMonthDate>{day}</NextMonthDate>
      ) : isCurrentMonthDate ? (
        <CurrentMonthDate>{day}</CurrentMonthDate>
      ) : (
        <OtherMonthDate>{day}</OtherMonthDate>
      )}
      <IconContainer>{renderMeetingIcon(meetingType)}</IconContainer>
      {hasEvent && <EventBar />}
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
  &:hover {
    background: #e0edff;
    color: white;
    transition: 0.3s;
  }
`;

const DaysDate = styled.div`
  width: 100%;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  position: relative;
`;

const TodayDate = styled(DaysDate)`
  font-size: 1.8rem;
`;

const TodayEventDate = styled.div`
  width: 100%;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 2px solid;
  box-shadow: 0 0 10px 1px #bfd7ea;
`;

const PreviousMonthDate = styled.div`
  color: lightgrey;
`;

const NextMonthDate = styled.div`
  color: lightgrey;
`;

const CurrentMonthDate = styled.div``;

const OtherMonthDate = styled.div`
  color: black;
  font-weight: normal;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const EventBar = styled.div`
  position: absolute;
  margin-left: 13px;
  bottom: 5px;
  left: 0;
  right: 0;
  width: 20px;
  height: 3px;
  background-color: #0056b3;
  border-radius: 20px;
  box-shadow: 0 0 3px 1px #0056b3;
`;
