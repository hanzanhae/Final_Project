import React from 'react';
import PropTypes from 'prop-types';
import CalendarIcon from '../../icons/calendar.svg';
import PinIcon from '../../icons/map-pin.svg';
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
} from '../../styles/detailPage/DetailStyle';

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
DetailInfo.propTypes = {
  meet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    deadlineDate: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    detailLocation: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
};
export default DetailInfo;
