import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 임시모임리스트
const meetingList = [];
for (let i = 1; i < 8; i++) {
  meetingList.push({
    id: i,
    name: `모임${i}`,
    place: `장소1${i}`,
    date: '24.10.16',
    time: '10:00',
    person: '3/10'
  });
}

const MeetingList = () => {
  return (
    <Container>
      <ListUl>
        {meetingList.map((list) => (
          <Link to="/detail" key={list.id}>
            <ListLi>
              <NameBox>
                <Name>{list.name}</Name>
                <Person>{list.person}</Person>
              </NameBox>
              <DateBox>
                <Date>{list.date}</Date>
                <Time>{list.time}</Time>
              </DateBox>
            </ListLi>
          </Link>
        ))}
      </ListUl>
    </Container>
  );
};

export default MeetingList;

// style
const Container = styled.div``;
const ListUl = styled.ul`
  padding: 2rem 5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;
const ListLi = styled.li`
  padding: 1rem;
  background-color: #ccc;
  border-radius: 0.5rem;
`;
const NameBox = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const DateBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Name = styled.h3``;
const Date = styled.p``;
const Time = styled.p``;
const Person = styled.p``;
