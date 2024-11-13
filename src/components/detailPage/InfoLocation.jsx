import React from 'react';
import styled from 'styled-components';
import KakaoLocation from './DetailLocation';
import { PushpinOutlined } from '@ant-design/icons';

const InfoLocation = ({ meet }) => {
  const content = meet.content;
  const detailAddress = content.address_full_name;
  const lon = content.coordinates.x;
  const lat = content.coordinates.y;
  const location = { lon, lat };

  return (
    <LocationWrapper>
      <Title>모임장소</Title>
      <LocationBox>
        <LocationText>
          <Icon />
          <Location>{detailAddress}</Location>
        </LocationText>
        {/* 카카오지도연결 */}
        <KakaoLocation location={location} />
      </LocationBox>
    </LocationWrapper>
  );
};

export default InfoLocation;

// style
const LocationWrapper = styled.div``;
const Title = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #333;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
`;
const LocationBox = styled.div`
  border: 2px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
  overflow: hidden;
  @media (max-width: 1440px) {
    border-width: 1.5px;
  }
`;
const LocationText = styled.div`
  font-size: 1.2rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media (max-width: 1440px) {
    font-size: 1rem;
  }
`;
export const Icon = styled(PushpinOutlined)`
  color: ${({ theme }) => theme.pointColor};
  font-size: 1.5rem;
  @media (max-width: 1440px) {
    font-size: 1rem;
  }
`;
const Location = styled.p``;
