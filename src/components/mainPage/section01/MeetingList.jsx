import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { gatheringData } from '../../../api/api';
import MeetingListBox from './MeetingListBox';
import {
  runningConcept,
  runningDistance
} from '../../../data/gatheringKeyword';

const LIST_PERPAGE = 4;

const MeetingList = () => {
  const { selectedOption, selectedDistance, selectedCategory } = useSelector(
    (state) => state.filter
  );

  // 모임데이터상태관리🚂
  const [gathering, setGethering] = useState([]);
  // console.log(gathering.length);

  // 모임목록데이터get🚂...
  const fetchGathering = async () => {
    const data = await gatheringData();
    if (data) {
      const gatheringResponse = data.content;
      setGethering(gatheringResponse);
      console.log(gatheringResponse);
    } else {
      console.log('모임목록데이터가 존재하지 않습니다.');
    }
  };
  useEffect(() => {
    fetchGathering();
  }, []);

  // 페이지네이션 상태관리
  const [visibleList, setVisibleList] = useState(LIST_PERPAGE);

  // 필터링
  const filteredMeetingList = gathering.filter((list) => {
    const memberNum = list.member_profile_urls.length;
    const deadlineDate = list.deadline;
    const currentDate = new Date();

    let optionMatch = true;

    if (selectedOption === '참여가능') {
      optionMatch = memberNum < 10 && deadlineDate > currentDate;
    } else if (selectedOption === '마감임박') {
      const oneDayBefore = new Date(currentDate);
      oneDayBefore.setDate(currentDate.getDate() + 1);
      optionMatch =
        memberNum >= 8 &&
        memberNum < 10 &&
        deadlineDate > currentDate &&
        deadlineDate <= oneDayBefore;
    } else if (selectedOption === '참여불가') {
      optionMatch = deadlineDate <= currentDate || memberNum === 10;
    } else if (selectedOption === '전체') {
      optionMatch = true;
    }

    const distanceMatch =
      !selectedDistance ||
      runningDistance(list.goal_distance) === selectedDistance;

    const categoryMatch =
      selectedCategory.length === 0 ||
      selectedCategory.includes(runningConcept(list.concept));

    return optionMatch && distanceMatch && categoryMatch;
  });

  const currentMeetingList = filteredMeetingList.slice(0, visibleList);

  // 더보기클릭 함수
  const handleClickMorePage = () => {
    setVisibleList((prev) => prev + LIST_PERPAGE);
  };

  return (
    <Container>
      <ListUl>
        {currentMeetingList.map((list) => {
          // console.log(list);
          return (
            <Link to={`/detail/${list.id}`} key={list.id}>
              <MeetingListBox list={list} />
            </Link>
          );
        })}
      </ListUl>
      {/* 페이지네이션 */}
      {visibleList < gathering.length ? (
        <MoreBtn onClick={handleClickMorePage}>더보기</MoreBtn>
      ) : (
        <MoreMsg>마지막 페이지입니다.</MoreMsg>
      )}
    </Container>
  );
};

export default MeetingList;

// style
const Container = styled.div`
  padding-bottom: 3rem;
`;
const ListUl = styled.ul`
  padding: 3rem 5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;
const MoreBtn = styled.button`
  display: block;
  margin: auto;
  padding: 1rem 2rem;
  background-color: #f0f0f0;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
  &:hover {
    color: #000;
  }
`;
const MoreMsg = styled.p`
  font-size: 0.8rem;
  color: #666;
  text-align: center;
`;
