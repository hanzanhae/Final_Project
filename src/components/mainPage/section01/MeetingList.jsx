import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { meetingList } from '../../../data/meetingList';

// icon
import PinIcon from '../../../icons/map-pin.svg';
import UsersIcon from '../../../icons/users.svg';

// style
import {
  Capacity,
  Container,
  Icon,
  ImgBox,
  InfoBox,
  InnerDot,
  InnerText,
  Keyword,
  KeywordBox,
  KeywordDate,
  KeywordText,
  ListLi,
  ListUl,
  Member,
  MemberBox,
  Members,
  MoreBtn,
  MoreMsg,
  ThumbNailImg,
  TimeBox,
  Title
} from '../../../styles/mainPage/MeetingListStyle';
import { gatheringDetailData, gatheringImagesData } from '../../../api/api';

const LIST_PERPAGE = 8;

const MeetingList = () => {
  // 모임데이터상태관리
  const [gatheringData, setGetheringData] = useState([]);
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

    const distanceMatch = !selectedDistance || list.distance === selectedDistance;
    const categoryMatch = selectedCategory.length === 0 || selectedCategory.includes(list.category);

    return optionMatch && distanceMatch && categoryMatch;
  });

  const currentMeetingList = filteredMeetingList.slice(0, visibleList);

  // 더보기클릭 함수
  const handleClickMorePage = () => {
    setVisibleList((prev) => prev + LIST_PERPAGE);
  };

  // 모임데이터🚂...
  const fetchGatheringDetail = async () => {
    const data = await gatheringDetailData(1);
    // console.log(data);
    // setGetheringData();
    // setGetheringMembers();
  };
  const fetchGatheringImages = async () => {
    const data = await gatheringImagesData(1);
    // console.log(data);
    // setGetheringImages();
  };
  // useEffect(() => {
  //   fetchGatheringDetail();
  //   fetchGatheringImages();
  // }, []);

  return (
    <Container>
      <ListUl>
        {currentMeetingList.map((list) => {
          const enterMembers = Array.from({ length: list.capacity }, (_, idx) => `이름${idx + 1}`);

          return (
            <Link to={`/detail/${list.id}`} key={list.id}>
              <ListLi>
                <ThumbNailImg src={list.thumbNail} alt="thumbnail" />
                <InfoBox>
                  <KeywordBox>
                    <KeywordText>
                      <Keyword>{list.distance}</Keyword>
                      <Keyword>{list.category}</Keyword>
                    </KeywordText>
                    <KeywordDate>~{list.deadlineDate}</KeywordDate>
                  </KeywordBox>
                  <Title>{list.title}</Title>
                  <TimeBox>
                    <Icon src={PinIcon} alt="pin-icon" />
                    <InnerText>{list.location}</InnerText>
                    <InnerDot />
                    <InnerText>{list.date}</InnerText>
                    <InnerDot />
                    <InnerText>{list.time}</InnerText>
                  </TimeBox>
                  <MemberBox>
                    <Members>
                      {enterMembers.map((member, idx) => (
                        <Member key={idx} $index={idx}>
                          {member}
                        </Member>
                      ))}
                    </Members>
                    <Capacity>
                      <Icon src={UsersIcon} alt="users-icon" />
                      {`${list.capacity}/10`}
                    </Capacity>
                  </MemberBox>
                </InfoBox>
              </ListLi>
            </Link>
          );
        })}
      </ListUl>
      {/* 페이지네이션 더보기버튼 */}
      {visibleList < filteredMeetingList.length ? (
        <MoreBtn onClick={handleClickMorePage}>더보기</MoreBtn>
      ) : (
        <MoreMsg>마지막 페이지입니다.</MoreMsg>
      )}
    </Container>
  );
};

export default MeetingList;
