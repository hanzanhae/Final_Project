import React, { useState } from 'react';
import Days from '../calendar/Days';
import styled from 'styled-components';
import DateModal from '../calendar/DateModal';

const DaysGrid = ({ daysArray, currentMonth, holidays, gatheringData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventsByDate, setEventsByDate] = useState({});
  const [currentDay, setCurrentDay] = useState();
  const [getGatheringIds, setGetGatheringIds] = useState([]);
  const handleDayClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);

    const dateKey = date.toLocaleDateString('en-CA');
    const gatheringsForDay = gatheringData.filter((gathering) =>
      gathering.appointed_at.startsWith(dateKey)
    );
    const idsArray = gatheringsForDay.map((gathering) => gathering.id);
    setCurrentDay(gatheringsForDay);
    setGetGatheringIds(idsArray);
    console.log(gatheringsForDay);
  };

  const handleUpdateEvents = (date, updatedEvents) => {
    setEventsByDate((prev) => ({
      ...prev,
      [date]: updatedEvents
    }));
  };

  const gatheringsByDate = gatheringData.reduce((acc, gathering) => {
    const appointedDate = new Date(gathering.appointed_at).toDateString();
    if (!acc[appointedDate]) {
      acc[appointedDate] = [];
    }
    acc[appointedDate].push(gathering);
    return acc;
  }, {});

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

          const gatheringsForDay = gatheringsByDate[dateKey] || [];

          return (
            <Days
              currentDay={currentDay}
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
        currentDay={currentDay}
        onUpdateEvents={handleUpdateEvents}
        events={eventsByDate[selectedDate?.toDateString()] || []}
        getGatheringIds={getGatheringIds}
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
