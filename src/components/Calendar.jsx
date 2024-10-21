import React from 'react';
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

  // 날짜 배열 생성 함수

  const createDaysArray = (prevDays, currentDays, nextDays) => {
    return [...prevDays, ...currentDays, ...nextDays];
  };

  const prevDays = [30]; // 이전 달의 마지막 날짜
  const currentDays = Array.from({ length: 31 }, (_, i) => i + 1); // 현재 달 날짜
  const nextDays = [1, 2, 3]; // 다음 달의 날짜

  const daysArray = createDaysArray(prevDays, currentDays, nextDays);

  return (
    <Box>
      <Container>
        <Left>
          <CalendarContainer>
            <Month>
              <PrevButton>◀️</PrevButton>
              <Date>October 2024</Date>
              <NextButton>▶️</NextButton>
            </Month>
            <Weekdays>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <WeekdaysBox key={day}>{day}</WeekdaysBox>
              ))}
            </Weekdays>
            <Days>
              {daysArray.map((day, index) => {
                const Component = day === 22 ? Today : day < 1 ? PrevDay : day > 31 ? NextDay : Day;
                return <Component key={index}>{day}</Component>;
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
  min-height: 550px;
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
  margin-bottom: 70px;
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
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Day = styled.div`
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

const PrevDay = styled(Day)`
  color: #d8d5db;
  font-weight: 400;
`;

const NextDay = styled(Day)`
  color: #d8d5db;
  font-weight: 400;
`;

const Today = styled(Day)`
  color: white;
  background: #bfd7ea;
  font-size: 1.5rem;
  box-shadow: 0 0 10px 2px #bfd7ea;
`;

const PrevButton = styled.div`
  cursor: pointer;
`;
const Date = styled.div``;

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
