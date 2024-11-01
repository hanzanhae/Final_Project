import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { meetingList } from '../../../data/meetingList';
import { gatheringDetailData, gatheringImagesData } from '../../../api/api';
import MeetingListBox from './MeetingListBox';

const LIST_PERPAGE = 8;

const MeetingList = () => {
  // 모임데이터상태관리
  const [gatheringData, setGetheringData] = useState({});
  const [gatheringMembers, setGetheringMembers] = useState([]);
  const [gatheringImages, setGetheringImages] = useState([]);

  const { selectedOption, selectedDistance, selectedCategory } = useSelector(
    (state) => state.filter
  );

  // 페이지네이션 상태관리
  const [visibleList, setVisibleList] = useState(LIST_PERPAGE);

  // 필터링
  const filteredMeetingList = meetingList.filter((list) => {
    let optionMatch = true;
    if (selectedOption === '참여가능') {
      optionMatch = list.capacity < 10; // 10명 미만
    } else if (selectedOption === '마감임박') {
      optionMatch = list.capacity >= 8 && list.capacity < 10; // 8명, 9명
    } else if (selectedOption === '전체') {
      optionMatch = true;
    }

    const distanceMatch =
      !selectedDistance || list.distance === selectedDistance;
    const categoryMatch =
      selectedCategory.length === 0 || selectedCategory.includes(list.category);

    return optionMatch && distanceMatch && categoryMatch;
  });

  const currentMeetingList = filteredMeetingList.slice(0, visibleList);

  // 더보기클릭 함수
  const handleClickMorePage = () => {
    setVisibleList((prev) => prev + LIST_PERPAGE);
  };

  // 모임데이터🚂...
  const fetchGatheringDetail = async () => {
    const data = await gatheringDetailData();
    console.log(data);
    if (data) {
      const gatheringResponse = data.gathering_response;
      const gatheringMembers = data.gathering_members;
      setGetheringData(gatheringResponse);
      setGetheringMembers(gatheringMembers);
    } else {
      console.log('모임상세데이터가 존재하지 않습니다.');
    }
  };
  const fetchGatheringImages = async () => {
    const data = await gatheringImagesData();
    console.log(data);
    if (data) {
      const gatheringImgUrl = data.contentImageUrls;
      setGetheringImages(gatheringImgUrl);
    } else {
      console.log('모임이미지데이터가 존재하지 않습니다.');
    }
  };
  useEffect(() => {
    fetchGatheringDetail();
    fetchGatheringImages();
  }, []);

  return (
    <Container>
      <ListUl>
        {currentMeetingList.map((list) => {
          const enterMembers = Array.from(
            { length: list.capacity },
            (_, idx) => `이름${idx + 1}`
          );
          return (
            <Link to={`/detail/${list.id}`} key={list.id}>
              <MeetingListBox list={list} enterMembers={enterMembers} />
            </Link>
          );
        })}
      </ListUl>
      {/* 페이지네이션 */}
      {visibleList < filteredMeetingList.length ? (
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
