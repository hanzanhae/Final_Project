import React, { useState } from 'react';
import Days from '../calendar/Days';
import styled from 'styled-components';
import DateModal from '../calendar/DateModal';

const DaysGrid = ({ daysArray, currentMonth, holidays }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventsByDate, setEventsByDate] = useState({});

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleUpdateEvents = (date, updatedEvents) => {
    setEventsByDate((prev) => ({
      ...prev,
      [date]: updatedEvents
    }));
  };

  return (
    <>
      <DaysContainer>
        {daysArray.map((dayObj, index) => {
          const isHoliday = holidays.includes(dayObj.day);

          const dateToCheck = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            dayObj.day
          );
          const isCurrentMonthDate =
            dayObj.isCurrentMonth &&
            dateToCheck.getFullYear() === currentMonth.getFullYear() &&
            dateToCheck.getMonth() === currentMonth.getMonth();

          const fullDate = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() +
              (dayObj.isNextMonth ? 1 : dayObj.isPreviousMonth ? -1 : 0),
            dayObj.day
          );

          const hasEvent = eventsByDate[fullDate.toDateString()]?.length > 0;

          return (
            <Days
              key={index}
              day={dayObj.day}
              fullDate={fullDate}
              isHoliday={isHoliday}
              isCurrentMonthDate={isCurrentMonthDate}
              isPreviousMonth={dayObj.isPreviousMonth}
              isNextMonth={dayObj.isNextMonth}
              onDayClick={handleDayClick}
              hasEvent={hasEvent}
            />
          );
        })}
      </DaysContainer>
      <DateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        date={selectedDate}
        onUpdateEvents={handleUpdateEvents}
        events={eventsByDate[selectedDate?.toDateString()] || []}
      />
    </>
  );
};

export default DaysGrid;

const DaysContainer = styled.div`
  width: 100%;
  padding: 0 18px;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 5px;
`;
