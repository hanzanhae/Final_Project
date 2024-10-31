import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ControlMonth from '../calendar/ControlMonth';
import DaysGrid from '../calendar/DaysGrid';
import JoinCount from '../calendar/JoinCount';
import CumulationCount from '../calendar/CumulationCount';
import axios from 'axios';
import { mockMeetings } from '../../data/mockMeetings';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [holidays, setHolidays] = useState([]);
  const [attendedCount, setAttendedCount] = useState(0);

  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo`,
          {
            params: {
              serviceKey: API_KEY,
              solYear: currentMonth.getFullYear(),
              solMonth: (currentMonth.getMonth() + 1)
                .toString()
                .padStart(2, '0'),
              _type: 'json'
            }
          }
        );
        console.log(response.data);
        const items = response.data.response.body.items.item;
        setHolidays(items || []);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchHolidays();
  }, [currentMonth, API_KEY]);

  useEffect(() => {
    const fetchMeetings = () => {
      const count = mockMeetings.filter((meeting) => {
        const meetingDate = new Date(meeting.date);
        return (
          meeting.type === 'attended' &&
          meetingDate.getMonth() === currentMonth.getMonth() &&
          meetingDate.getFullYear() === currentMonth.getFullYear()
        );
      }).length;

      setAttendedCount(count);
    };

    fetchMeetings();
  }, [currentMonth]);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };
  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const daysInMonth = getDaysInMonth(
    currentMonth.getMonth(),
    currentMonth.getFullYear()
  );
  const firstDayOfMonth = getFirstDayOfMonth(
    currentMonth.getMonth(),
    currentMonth.getFullYear()
  );

  const currentDays = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: true,
    isPreviousMonth: false,
    isNextMonth: false
  }));

  const prevDaysCount = firstDayOfMonth;
  const prevMonthLastDay = getDaysInMonth(
    currentMonth.getMonth() - 1,
    currentMonth.getFullYear()
  );
  const prevDays = Array.from({ length: prevDaysCount }, (_, i) => ({
    day: prevMonthLastDay - i,
    isCurrentMonth: false,
    isPreviousMonth: true,
    isNextMonth: false
  })).reverse();

  const totalDays = prevDays.length + currentDays.length;
  const nextDaysCount = Math.max(0, 35 - totalDays);
  const nextDays = Array.from({ length: nextDaysCount }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: false,
    isPreviousMonth: false,
    isNextMonth: true
  }));

  const daysArray = [...prevDays, ...currentDays, ...nextDays];

  const monthYearString = currentMonth.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <Box>
      <Container>
        <Left>
          <CalendarContainer>
            <ControlMonth
              monthYearString={monthYearString}
              handlePrevMonth={handlePrevMonth}
              handleNextMonth={handleNextMonth}
            />
            <Weekdays>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <WeekdaysBox key={day}>{day}</WeekdaysBox>
              ))}
            </Weekdays>
            <DaysGrid
              daysArray={daysArray}
              daysInMonth={daysInMonth}
              currentMonth={currentMonth}
              holidays={holidays.map((holiday) => holiday.locdate % 100)}
            />
          </CalendarContainer>
        </Left>
        <Right>
          <Notice>Click Me</Notice>
          <JoinCount attendedCount={attendedCount} />
          <CumulationCount />
        </Right>
      </Container>
    </Box>
  );
};

export default Calendar;

const Box = styled.div`
  margin-top: 150px;
  font-family: 'Poppins', sans-serif;
`;

const Container = styled.div`
  width: 730px;
  height: 620px;
  margin: 0 auto;
  padding: 5px;
  color: white;
  display: flex;
  border-radius: 10px;
  background-color: #bde0fe;
  box-shadow: 0 0 10px 2px #bfd7ea;
`;

const Left = styled.div`
  width: 60%;
  padding: 30px;
`;

const CalendarContainer = styled.div`
  width: 350px;
  height: 550px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  color: #a2d2ff;
  background-color: white;
`;

const Weekdays = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-size: 1rem;
  font-weight: 450;
`;

const WeekdaysBox = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Notice = styled.button`
  width: 300px;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
  margin-left: 60px;
`;

const Right = styled.div`
  width: 60%;
  padding: 30px;
`;
