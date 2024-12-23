import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaTimesCircle,
  FaBell
} from 'react-icons/fa';

const Days = ({
  day,
  fullDate,
  isHoliday,
  isCurrentMonthDate,
  isPreviousMonth,
  isNextMonth,
  onDayClick,
  hasEvent,
  events,
  gatherings
}) => {
  const today = new Date();
  const isToday =
    fullDate.getDate() === today.getDate() &&
    fullDate.getMonth() === today.getMonth() &&
    fullDate.getFullYear() === today.getFullYear();

  const [eventIcon, setEventIcon] = useState(null);

  useEffect(() => {
    const icon = gatherings.reduce((acc, gathering) => {
      const appointedDate = new Date(gathering.appointed_at);

      if (
        appointedDate.getFullYear() === fullDate.getFullYear() &&
        appointedDate.getMonth() === fullDate.getMonth() &&
        appointedDate.getDate() === fullDate.getDate()
      ) {
        const isFutureDate = appointedDate > today;
        const isPastDate = appointedDate < today;

        if (isFutureDate && gathering.attendance_status === 'PENDING') {
          return <FaCalendarAltIcon />;
        } else if (isPastDate && gathering.attendance_status === 'ATTENDING') {
          return <FaCheckCircleIcon />;
        } else if (
          isPastDate &&
          gathering.attendance_status === 'NOT_ATTENDING'
        ) {
          return <FaTimesCircleIcon />;
        }
      }
      return acc;
    }, null);

    setEventIcon(icon);
  }, [gatherings, fullDate]);

  return (
    <DaysContainer onClick={() => onDayClick(fullDate)}>
      {isToday ? (
        events.length > 0 ? (
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
      <IconContainer>{eventIcon}</IconContainer>
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

const FaCalendarAltIcon = styled(FaCalendarAlt)`
  color: #83c5;
  font-size: 20px;
  margin-top: 5px;
`;

const FaBellIcon = styled(FaBell)`
  color: #ffbe0b;
  font-size: 20px;
  margin-top: 5px;
`;

const FaTimesCircleIcon = styled(FaTimesCircle)`
  color: #ff0054;
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
