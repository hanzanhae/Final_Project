import React from 'react';
import Days from '../calendar/Days';
import styled from 'styled-components';

const DaysGrid = ({ daysArray, daysInMonth, currentMonth, holidays }) => {
  return (
    <DaysContainer>
      {daysArray.map((day, index) => {
        const isCurrentMonthDate = day > 0 && day <= daysInMonth;
        const isHoliday = holidays.includes(day); // 공휴일 날짜 확인

        if (isCurrentMonthDate) {
          return (
            <Days key={index} day={day} currentMonth={currentMonth} isHoliday={isHoliday}/>
          );
        } else if (day > daysInMonth) {
          return <NextDate key={index}>{day}</NextDate>;
        } else {
          return <PrevDate key={index}>{day}</PrevDate>;
        }
      })}
    </DaysContainer>
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

const PrevDate = styled.div`
  width: 14.28%;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20%;
  color: #d8d5db;
  font-weight: 400;
`;

const NextDate = styled(PrevDate)``;
