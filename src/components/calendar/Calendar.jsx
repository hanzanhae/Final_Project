import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ControlMonth from '../calendar/ControlMonth';
import DaysGrid from '../calendar/DaysGrid';
//import JoinCount from '../calendar/JoinCount';
//import CumulationCount from '../calendar/CumulationCount';
import axios from 'axios';
import peopleImage from '../../images/people.jpg';
import personImage from '../../images/person.jpg';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [holidays, setHolidays] = useState([]);
  //const [attendedCount, setAttendedCount] = useState(0);
  //const [cumulatedDistance, setCumulatedDistance] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isSidebarMoving, setIsSidebarMoving] = useState(false);

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

  // useEffect(() => {
  //   const fetchCalendarData = async () => {
  //     try {
  //       const response = await axios.get(`/users/calender`, {
  //         params: {
  //           year: 2024,
  //           month: 11
  //         }
  //       });
  //       const data = response.data;
  //       console.log('Attendance Data:', response.data);
  //       setAttendedCount(data.attendance_count || 0);
  //       setCumulatedDistance(data.total_real_distance || 0.0);
  //     } catch (error) {
  //       console.error('Error fetching calendar data:', error);
  //     }
  //   };

  //   fetchCalendarData();
  // }, [currentMonth]);

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

  const handleClick = () => {
    setIsSidebarMoving(true);
    setExpanded((prev) => !prev);
    setTimeout(() => {
      setIsSidebarMoving(false);
    }, 500);
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
      <Container expanded={expanded}>
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
        <Sidebar expanded={expanded} isSidebarMoving={isSidebarMoving}>
          <SidebarContent expanded={expanded}>
            <SidebarImage expanded={expanded} src={personImage} alt="Person" />
            <SidebarText expanded={expanded}>
              <SidebarTitle>달리기 주의사항</SidebarTitle>
              <SidebarComment>⦁ 열 발산 막는 모자는 쓰지 말아라</SidebarComment>
              <SidebarComment>⦁ 기록·완주에 대한 집착을 버려라</SidebarComment>
              <SidebarComment>
                ⦁ 운동 전과 도중에 충분히 물 마셔라
              </SidebarComment>
              <SidebarComment>
                ⦁ 당분 8% 넘는 스포츠음료는 피하라
              </SidebarComment>
              <SidebarComment>⦁ 현기증, 구토 난다면 즉시 멈춰라</SidebarComment>
            </SidebarText>
          </SidebarContent>
          <PostThree onClick={handleClick}>𖤐 ᵕ̈</PostThree>
        </Sidebar>
        <PostOne></PostOne>
        <PostTwo></PostTwo>
        <Right>
          {/* <JoinCount attendedCount={attendedCount} />
          <CumulationCount cumulatedDistance={cumulatedDistance} /> */}
        </Right>
      </Container>
    </Box>
  );
};

export default Calendar;

const Box = styled.div`
  margin-top: 40px;
`;

const Container = styled.div`
  position: relative;
  width: 770px;
  height: 620px;
  margin: 0 auto;
  padding: 5px;
  color: white;
  display: flex;
  box-shadow: 0 0 10px 2px #dee2e6;
  border-radius: 30px;
  background-image: url(${peopleImage});
  transform: translateX(${({ expanded }) => (expanded ? '-180px' : '0')});
  transition: transform 1s ease;
`;

const Sidebar = styled.div`
  width: ${({ expanded }) => (expanded ? '300px' : '40px')};
  height: 580px;
  box-shadow: 0 0 10px 2px #dee2e6;
  border-radius: 0 30px 30px 0;
  background-color: #f6f6f6;
  transition: width 0.8s ease;
  position: absolute;
  margin-left: 3px;
  top: 50%;
  left: 100%;
  transform: translateY(-50%)
    translateX(${({ isSidebarMoving }) => (isSidebarMoving ? '5px' : '0')});
  transition: width 0.8s ease;
`;

const SidebarContent = styled.div`
  color: black;
  padding: 10px;
  margin-top: 10px;
`;

const SidebarImage = styled.img`
  width: 270px;
  height: 200px;
  border-radius: 10px;
  margin-bottom: 50px;
  margin-left: 5px;
  display: ${({ expanded }) => (expanded ? 'block' : 'none')};
`;

const SidebarText = styled.div`
  width: ${({ expanded }) => (expanded ? '270px' : '0')};
  padding: 5px;
  margin-left: 5px;
  border-radius: 10px;
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  transform: ${({ expanded }) =>
    expanded ? 'translateX(0)' : 'translateX(-100%)'};
  transition:
    width 0.2s ease,
    opacity 0.3s ease,
    transform 0.8s ease;
  overflow: hidden;
`;

const SidebarTitle = styled.h2`
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
`;

const SidebarComment = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  padding-left: 20px;
  text-align: left;
`;

const PostOne = styled.div`
  position: absolute;
  top: 10%;
  left: 100%;
  width: 100px;
  height: 40px;
  border: 1px;
  background-color: #b3dee2;
  opacity: 0.5;
  transform: translateY(-50%) translateX(1px);
`;

const PostTwo = styled.div`
  position: absolute;
  top: 20%;
  left: 100%;
  width: 70px;
  height: 40px;
  border: 1px;
  background-color: #eaf2d7;
  opacity: 0.7;
  transform: translateY(-50%) translateX(1px);
`;

const PostThree = styled.div`
  position: absolute;
  top: 40%;
  left: 100%;
  margin-left: 1.5px;
  width: 70px;
  height: 40px;
  border: 1px;
  font-size: 1.8rem;
  text-align: center;
  cursor: pointer;
  background-color: #efcfe3;
  opacity: 0.7;
  transform: translateY(-50%) translateX(1px);
  transition: trnaslateX 0.5s ease;
`;

const Left = styled.div`
  width: 60%;
  padding: 30px;
`;

const CalendarContainer = styled.div`
  position: relative;
  width: 350px;
  height: 550px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #dee2e6;
  border-radius: 30px;
  color: #0056b3;
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

const Right = styled.div`
  width: 60%;
  padding: 30px;
  margin-left: 80px;
`;
