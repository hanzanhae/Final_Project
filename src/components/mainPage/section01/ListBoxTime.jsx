import { PushpinOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';

const ListBoxTime = ({ list }) => {
  const location1 = list.location.address_names.region_1depth_name;
  const location2 = list.location.address_names.region_2depth_name;
  const location3 = list.location.address_names.region_3depth_name;

  const newDate = format(list.appointed_at, 'MM/dd');
  const newTime = format(list.appointed_at, 'HH시 mm분');

  return (
    <TimeBox>
      <PinIcon />
      <InnerText>
        {location1.slice(0, 6)} {location2.slice(0, 6)} {location3.slice(0, 6)}
      </InnerText>
      <InnerDot />
      <InnerText>{newDate}</InnerText>
      <InnerDot />
      <InnerText>{newTime}</InnerText>
    </TimeBox>
  );
};

export default ListBoxTime;

// style
const TimeBox = styled.div`
  display: flex;
  align-items: center;
`;
const InnerText = styled.p`
  color: #666;
  font-size: 1.1rem;
  @media (max-width: 1440px) {
    font-size: 1rem;
  }
`;
const InnerDot = styled.span`
  margin: 0 0.5rem;
  width: 5px;
  aspect-ratio: 1/1;
  background-color: #ececec;
  border-radius: 1rem;
`;
const PinIcon = styled(PushpinOutlined)`
  margin-right: 0.5rem;
  color: #ccc;
  font-size: 1.2rem;
  @media (max-width: 1440px) {
    margin-right: 0.3rem;
    font-size: 1rem;
  }
`;
