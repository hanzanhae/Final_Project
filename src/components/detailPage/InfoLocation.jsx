import React from 'react';
import styled from 'styled-components';
import KakaoLocation from './DetailLocation';
import { PushpinOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const InfoLocation = ({ meet }) => {
  return (
    <LocationWrapper>
      <Title>모임장소</Title>
      <LocationBox>
        <LocationText>
          <Icon>
            <PushpinOutlined />
          </Icon>
          <Location>{meet.detailLocation}</Location>
        </LocationText>
        {/* 카카오지도연결 */}
        <KakaoLocation />
      </LocationBox>
    </LocationWrapper>
  );
};
InfoLocation.propTypes = {
  meet: PropTypes.shape({
    detailLocation: PropTypes.string.isRequired
  }).isRequired
};
export default InfoLocation;

// style
const LocationWrapper = styled.div``;
const Title = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: #333;
`;
const LocationBox = styled.div`
  border: 1px solid #f4f4f5;
  border-radius: 0.5rem;
  overflow: hidden;
`;
const LocationText = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const Icon = styled.div`
  width: 1rem;
  color: #ccc;
`;
const Location = styled.p``;
