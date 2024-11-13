import React, { useState } from 'react';
import Days from '../calendar/Days';
import styled from 'styled-components';
import DateModal from '../calendar/DateModal';

const DaysGrid = ({ daysArray, currentMonth, holidays, gatheringData }) => {
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
          const dateToCheck = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            dayObj.day
          );
          const isCurrentMonthDate =
            dayObj.isCurrentMonth &&
            dateToCheck.getFullYear() === currentMonth.getFullYear() &&
            dateToCheck.getMonth() === currentMonth.getMonth();

          const isHoliday = isCurrentMonthDate && holidays.includes(dayObj.day);

          const fullDate = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() +
              (dayObj.isNextMonth ? 1 : dayObj.isPreviousMonth ? -1 : 0),
            dayObj.day
          );

          const hasEvent = eventsByDate[fullDate.toDateString()]?.length > 0;

          const dateKey = fullDate.toDateString();
          const eventsForDay = eventsByDate[dateKey] || [];

          const gatheringsForDay = gatheringData.filter((gathering) =>
            gathering.appointed_at.startsWith(dateKey)
          );

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
              events={eventsForDay}
              gatherings={gatheringsForDay}
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
