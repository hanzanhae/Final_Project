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

const MeetingList = () => {
  const { selectedOption, selectedDistance, selectedCategory } = useSelector(
    (state) => state.filter
  );

  const [gathering, setGathering] = useState([]);
  const [filteredGathering, setFilteredGathering] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);

  const fetchGathering = async () => {
    setMoreLoading(true);
    const data = await gatheringData(pageNumber, pageSize);
    if (data) {
      const gatheringRes = data.gathering_responses.content;
      const pageNumberRes = data.gathering_responses.pageable.pageNumber;
      const pageSizeRes = data.gathering_responses.pageable.pageSize;

      if (pageNumberRes === 0) {
        setGathering(gatheringRes);
      } else {
        setGathering((prev) => [...prev, ...gatheringRes]);
      }

      setPageNumber(pageNumberRes + 1);
      setPageSize(pageSizeRes);
      setHasMoreData(!data.gathering_responses.last);
    } else {
      console.log('모임목록데이터가 존재하지 않습니다.');
    }
    setMoreLoading(false);
  };
  useEffect(() => {
    fetchGathering();
  }, [pageNumber]);

  const handlefilteredGathering = () => {
    const filteredList = gathering.filter((list) => {
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
    setFilteredGathering(filteredList);
  };

  useEffect(() => {
    handlefilteredGathering();
  }, [gathering, selectedOption, selectedDistance, selectedCategory]);

  const handleClickMorePage = () => {
    if (hasMoreData && !moreLoading) {
      setPageNumber((prev) => prev + 1);
    }
  };

  return (
    <Container>
      <ListUl>
        {filteredGathering.map((list) => {
          return (
            <Link to={`/detail/${list.id}`} key={list.id}>
              <MeetingListBox list={list} />
            </Link>
          );
        })}
      </ListUl>
      {/* 페이지네이션 */}
      {hasMoreData ? (
        <MoreBtn onClick={handleClickMorePage} disabled={moreLoading}>
          더보기
        </MoreBtn>
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
