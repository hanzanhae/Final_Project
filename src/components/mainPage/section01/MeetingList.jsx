import React from 'react';
import { Link } from 'react-router-dom';

import PinIcon from '../../../icons/map-pin.svg';
import UsersIcon from '../../../icons/users.svg';
import { meetingList } from '../../../meetingList';

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
  TimeBox,
  Title
} from '../../../styles/mainPage/MeetingListStyle';

const MeetingList = () => {
  return (
    <Container>
      <ListUl>
        {meetingList.map((list) => (
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
      {/* 페이지네이션 구현예정 */}
      <MoreBtn>더보기</MoreBtn>
    </Container>
  );
};

export default MeetingList;
