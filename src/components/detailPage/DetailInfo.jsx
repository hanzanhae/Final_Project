import React from 'react';
import PropTypes from 'prop-types';
import KakaoLocation from './DetailLocation';

// icon
import CalendarIcon from '../../icons/calendar.svg';
import PinIcon from '../../icons/map-pin.svg';

// style
import {
  Date,
  Deadline,
  Description,
  DescriptionBox,
  Icon,
  InfoContaier,
  InfoLocation,
  Infomation,
  InfoTextBox,
  InfoTime,
  Keyword,
  KeywordBox,
  Keywords,
  Location,
  LocationBox,
  LocationText,
  Name,
  ProfileBox,
  ProfileImg,
  Time,
  TimeBox,
  Title
} from '../../styles/detailPage/DetailStyle';

const DetailInfo = ({ meet }) => {
  return (
    <InfoContaier>
      <Infomation>
        <ProfileBox>
          <ProfileImg />
          <Name>{meet.name}</Name>
        </ProfileBox>
        <InfoTextBox>
          <Title>{meet.title}</Title>
          <DescriptionBox>
            <KeywordBox>
              <Keywords>
                <Keyword>{meet.distance}</Keyword>
                <Keyword>{meet.category}</Keyword>
              </Keywords>
              <Deadline>모집기한 : ~{meet.deadlineDate}</Deadline>
            </KeywordBox>
            <Description>{meet.description}</Description>
          </DescriptionBox>
        </InfoTextBox>
      </Infomation>
      {/*  */}
      <InfoTime>
        <Title>모임시간</Title>
        <TimeBox>
          <Icon src={CalendarIcon} alt="calendar-icon" />
          <Date>{meet.date}</Date>
          <Time>{meet.time}</Time>
        </TimeBox>
      </InfoTime>
      {/*  */}
      <InfoLocation>
        <Title>모임장소</Title>
        <LocationBox>
          <LocationText>
            <Icon src={PinIcon} alt="pin-icon" />
            <Location>{meet.detailLocation}</Location>
          </LocationText>
          {/* 카카오지도연결 */}
          <KakaoLocation />
        </LocationBox>
      </InfoLocation>
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
