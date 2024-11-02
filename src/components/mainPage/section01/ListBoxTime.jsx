import { PushpinOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

const ListBoxTime = ({ list }) => {
  return (
    <TimeBox>
      <PinIcon>
        <PushpinOutlined />
      </PinIcon>
      <InnerText>{list.location}</InnerText>
      <InnerDot />
      <InnerText>{list.date}</InnerText>
      <InnerDot />
      <InnerText>{list.time}</InnerText>
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
