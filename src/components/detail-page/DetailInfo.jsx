import React from 'react';

// icon
import CalendarIcon from '../../icons/calendar.svg';
import PinIcon from '../../icons/map-pin.svg';

// style
import {
  Date,
  Deadline,
  Description,
  Icon,
  InfoContaier,
  InfoDescription,
  InfoLocation,
  InfoThumbNail,
  InfoTime,
  Keyword,
  KeywordBox,
  Keywords,
  Location,
  LocationBox,
  LocationMap,
  Name,
  ProfileBox,
  ProfileImg,
  ThumbNailImage,
  Time,
  TitleBox
} from '../../styles/detail-page/DetailStyle';

const DetailInfo = ({ meet }) => {
  if (!meet) {
    return <div>모임 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <InfoContaier>
      <ThumbNailImage />
      <InfoThumbNail>
        <ProfileBox>
          <ProfileImg />
          <Name>{meet.name}</Name>
        </ProfileBox>
        <TitleBox>{meet.title}</TitleBox>
        <KeywordBox>
          <Keywords>
            <Keyword>{meet.category}</Keyword>
            <Keyword>{meet.category}</Keyword>
          </Keywords>
          <Deadline>모집기한 : ~{meet.deadlineDate}</Deadline>
        </KeywordBox>
      </InfoThumbNail>
      {/*  */}
      <InfoTime>
        <Icon src={CalendarIcon} alt="calendar-icon" />
        <Date>{meet.date}</Date>
        <Time>{meet.time}</Time>
      </InfoTime>
      {/*  */}
      <InfoLocation>
        <LocationBox>
          <Icon src={PinIcon} alt="pin-icon" />
          <Location>{meet.detailLocation}</Location>
        </LocationBox>
        <LocationMap></LocationMap>
      </InfoLocation>
      {/*  */}
      <InfoDescription>
        <Description>{meet.description}</Description>
      </InfoDescription>
    </InfoContaier>
  );
};

export default DetailInfo;
