import { PushpinOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';

const ListBoxTime = ({ list }) => {
  const location = list.location.address_names.address_name;
  const newDate = format(list.appointed_at, 'MM/dd');
  const newTime = format(list.appointed_at, 'HH시 mm분');

  return (
    <TimeBox>
      <PinIcon>
        <PushpinOutlined />
      </PinIcon>
      <InnerText>{location}</InnerText>
      <InnerDot />
      <InnerText>{newDate}</InnerText>
      <InnerDot />
      <InnerText>{newTime}</InnerText>
      {/* <InnerText>{list.location}</InnerText>
      <InnerDot />
      <InnerText>{list.date}</InnerText>
      <InnerDot />
      <InnerText>{list.time}</InnerText> */}
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
