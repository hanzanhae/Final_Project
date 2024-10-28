import React from 'react';
import styled from 'styled-components';

const JoinCount = ({ attendedCount }) => (
  <JoinCountWrapper>
    <JoinTitle>참</JoinTitle>
    <JoinTitle>여</JoinTitle>
    <JoinTitle>횟</JoinTitle>
    <JoinTitle>수</JoinTitle>
    <JoinTitle>🏃‍➡️</JoinTitle>
    <Number>: {attendedCount}회</Number>
  </JoinCountWrapper>
);

export default JoinCount;

const JoinCountWrapper = styled.div`
  width: 205px;
  height: 100px;
  margin: 8px;
  margin-bottom: 120px;
  margin-top: 70px;
`;

const JoinTitle = styled.span`
  font-size: 2.6rem;
  font-weight: 550;
  color: #fff;
  position: relative;
  top: 20px;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  text-shadow:
    0 1px 0 #ccc,
    0 2px 0 #ccc,
    0 3px 0 #ccc,
    0 4px 0 #ccc,
    0 5px 0 #ccc,
    0 6px 0 transparent,
    0 7px 0 transparent,
    0 8px 0 transparent,
    0 9px 0 transparent,
    0 10px 10px rgba(0, 0, 0, 0.4);
  animation: bounce 1.3s ease infinite alternate;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.1s;
  }
  &:nth-child(3) {
    animation-delay: 0.1s;
  }
  &:nth-child(4) {
    animation-delay: 0.1s;
  }
  &:nth-child(5) {
    animation-delay: 0.5s;
  }

  @keyframes bounce {
    100% {
      top: -1px;
    }
  }
`;

const Number = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-top: 30px;
`;
