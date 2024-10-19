import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { meetingList } from '../../../meetingList';

// icon
import PinIcon from '../../../icons/map-pin.svg';
import UsersIcon from '../../../icons/users.svg';

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
  TimeBox,
  Title
} from '../../../styles/mainPage/MeetingListStyle';

const LIST_PERPAGE = 8;

const MeetingList = () => {
  // 페이지네이션 상태관리
  const [visibleList, setVisibleList] = useState(LIST_PERPAGE);
  const currentMeetingList = meetingList.slice(0, visibleList);

  // 더보기클릭 함수
  const handleClickMorePage = () => {
    setVisibleList((prev) => prev + LIST_PERPAGE);
  };

  return (
    <Container>
      <ListUl>
        {currentMeetingList.map((list) => (
          <Link to={`/detail/${list.id}`} key={list.id}>
            <ListLi>
              <ImgBox $thumbnailimg={list.thumbNail} />
              <InfoBox>
                <KeywordBox>
                  <KeywordText>
                    <Keyword>{list.category}</Keyword>
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
                    {list.members.map((member, idx) => (
                      <Member key={idx}>{member}</Member>
                    ))}
                  </Members>
                  <Capacity>
                    <Icon src={UsersIcon} alt="users-icon" />
                    {list.capacity}
                  </Capacity>
                </MemberBox>
              </InfoBox>
            </ListLi>
          </Link>
        ))}
      </ListUl>
      {/* 페이지네이션 더보기버튼 */}
      {visibleList < meetingList.length ? (
        <MoreBtn onClick={handleClickMorePage}>더보기</MoreBtn>
      ) : (
        <MoreMsg>마지막 페이지입니다.</MoreMsg>
      )}
    </Container>
  );
};

export default MeetingList;
