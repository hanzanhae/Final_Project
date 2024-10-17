import React from 'react';
import { Link } from 'react-router-dom';

import ThumbNailImg from '../../../images/thumbnail.jpg';
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
  TimeBox,
  Title
} from '../../../styles/main-page/MeetingListStyle';

// 임시모임리스트
const meetingList = [];
for (let i = 1; i <= 8; i++) {
  meetingList.push({
    id: i,
    thumbNail: ThumbNailImg,
    title: '방이름',
    distance: '00km',
    categoty: '키워드',
    location: '00동',
    date: '24.10.16',
    time: '10:00',
    capacity: '3/10',
    deadlineDate: '10/31',
    members: ['이름', '이름', '이름', '이름', '이름', '이름']
  });
}

const MeetingList = () => {
  return (
    <Container>
      <ListUl>
        {meetingList.map((list) => (
          <Link to="/detail" key={list.id}>
            <ListLi>
              <ImgBox ThumbNailImg={ThumbNailImg} />
              <InfoBox>
                <KeywordBox>
                  <KeywordText>
                    <Keyword>{list.categoty}</Keyword>
                    <Keyword>{list.categoty}</Keyword>
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
      {/* 더보기버튼 */}
      <MoreBtn>더보기</MoreBtn>
    </Container>
  );
};

export default MeetingList;
