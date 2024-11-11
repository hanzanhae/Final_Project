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
      <PinIcon>
        <PushpinOutlined />
      </PinIcon>
      <InnerText>
        {location1} {location2} {location3}
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
`;
const InnerDot = styled.span`
  margin: 0 0.5rem;
  width: 5px;
  aspect-ratio: 1/1;
  background-color: #ececec;
  border-radius: 1rem;
`;
const PinIcon = styled.div`
  margin-right: 0.2rem;
  width: 1rem;
  color: #ccc;
`;
