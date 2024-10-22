import React, { useState } from 'react';
import styled from 'styled-components';
//import axios from 'axios';

const Calendar = () => {
  //const [event, setEvent] = useState([]);

  //const mockData = [
  //{ date: '2024-10-10', status: 'approved' }, // 런닝한 날짜
  //{ date: '2024-10-11', status: 'canceled' }, // 참여하지 않은 날짜
  //{ date: '2024-10-14', status: 'approved' }
  //];

  //useEffect(() => {
  // 실제 API 호출을 통해 데이터를 가져오는 코드
  // axios.get('/api/events').then(response => {
  //   setEvents(response.data);
  // });
  // 예시 데이터로 초기화
  //setEvent(mockData);
  //}, []);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth.getMonth(), currentMonth.getFullYear());

  // 현재 달의 날짜 배열
  const currentDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // 이전 달 날짜 계산
  const prevDaysCount = firstDayOfMonth; // 필요한 이전 달 날짜 수
  const prevMonthLastDay = getDaysInMonth(currentMonth.getMonth() - 1, currentMonth.getFullYear());
  const prevDays = Array.from({ length: prevDaysCount }, (_, i) => prevMonthLastDay - i).reverse();

  const totalDays = prevDays.length + currentDays.length;
  const nextDaysCount = Math.max(0, 35 - totalDays);
  const nextDays = Array.from({ length: nextDaysCount }, (_, i) => i + 1);

  // 모든 날짜 배열
  const daysArray = [...prevDays, ...currentDays, ...nextDays];

  return (
    <Box>
      <Container>
        <Left>
          <CalendarContainer>
            <Month>
              <PrevButton onClick={handlePrevMonth}>◀️</PrevButton>
              <Year>
                {currentMonth.toLocaleString('default', { month: 'long' })}
                {currentMonth.getFullYear()}
              </Year>
              <NextButton onClick={handleNextMonth}>▶️</NextButton>
            </Month>
            <Weekdays>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <WeekdaysBox key={day}>{day}</WeekdaysBox>
              ))}
            </Weekdays>
            <Days>
              {daysArray.map((day, index) => {
                const isToday =
                  day === new Date().getDate() &&
                  currentMonth.getMonth() === new Date().getMonth() &&
                  currentMonth.getFullYear() === new Date().getFullYear();

                // 날짜가 현재 달의 날짜인지 확인
                const isCurrentMonthDate = day > 0 && day <= daysInMonth;

                // 스타일 적용
                if (isToday) {
                  return <TodayDate key={index}>{day}</TodayDate>;
                } else if (isCurrentMonthDate) {
                  return <DaysDate key={index}>{day}</DaysDate>;
                } else if (day > daysInMonth) {
                  return <NextDate key={index}>{day}</NextDate>; // 다음 달 날짜 스타일
                } else {
                  return <PrevDate key={index}>{day}</PrevDate>; // 이전 달 날짜 스타일
                }
              })}
            </Days>
          </CalendarContainer>
        </Left>
        <Right>
          <JoinCount>
            <Title>참여횟수👍🏻</Title>
            <Number>: 15회</Number>
          </JoinCount>
          <CumulationCount>
            <Title>총 누적거리</Title>
            <Number>: 40km</Number>
          </CumulationCount>
        </Right>
      </Container>
    </Box>
  );
};

export default Calendar;

const Box = styled.div`
  margin-top: 150px;
`;

const Container = styled.div`
  width: 720px;
  height: ${(props) => props.height}px; /* 동적으로 높이 설정 */
  margin: 0 auto;
  padding: 5px;
  color: white;
  display: flex;
  border-radius: 10px;
  background-color: #bde0fe;
  transition: width 0.3s ease; // 너비 애니메이션
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
  color: #c2c2bc;
  background-color: white;
`;

const Month = styled.div`
  width: 100%;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  font-size: 1.2rem;
  font-weight: 550;
  margin-bottom: 50px;
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

const Days = styled.div`
  width: 100%;
  padding: 0 20px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 5px;
`;

const DaysDate = styled.div`
  width: 14.28%;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20%;
  &:hover {
    background: #bfd7ea;
    color: white;
    transition: 0.3s;
  }
  color: #c2c2bc;
`;

const PrevDate = styled(DaysDate)`
  color: #d8d5db;
  font-weight: 400;
`;

const NextDate = styled(DaysDate)`
  color: #d8d5db;
  font-weight: 400;
`;

const TodayDate = styled(DaysDate)`
  color: white;
  background: #bfd7ea;
  font-size: 1.5rem;
  box-shadow: 0 0 10px 2px #bfd7ea;
`;

const PrevButton = styled.div`
  cursor: pointer;
`;
const Year = styled.div``;

const NextButton = styled.div`
  cursor: pointer;
`;

const Right = styled.div`
  width: 60%;
  padding: 30px;
`;

const JoinCount = styled.div`
  width: 250px;
  height: 100px;
  margin: 8px;
  margin-bottom: 190px;
  margin-top: 70px;
`;

const CumulationCount = styled.div`
  width: 250px;
  height: 100px;
  margin: 8px;
`;

const Title = styled.div`
  font-size: 2.8rem;
  font-weight: 600;
`;

const Number = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-top: 30px;
`;
