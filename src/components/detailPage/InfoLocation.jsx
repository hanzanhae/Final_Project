import React from 'react';
import styled from 'styled-components';
import KakaoLocation from './DetailLocation';
import { PushpinOutlined } from '@ant-design/icons';

const InfoLocation = ({ meet }) => {
  const location = meet.location.address_names.address_name;
  const location2 = meet.location.address_names.region_2depth_name;
  const location3 = meet.location.address_names.region_3depth_name;

  return (
    <LocationWrapper>
      <Title>모임장소</Title>
      <LocationBox>
        <LocationText>
          <Icon>
            <PushpinOutlined />
          </Icon>
          <Location>{`${location}, ${location2}, ${location3}`}</Location>
        </LocationText>
        {/* 카카오지도연결 */}
        <KakaoLocation />
      </LocationBox>
    </LocationWrapper>
  );
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
  border: 1px solid ${({ theme }) => theme.borderColor};
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
