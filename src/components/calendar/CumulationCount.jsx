import React from 'react';
import styled from 'styled-components';

const CumulationCount = ({ cumulatedDistance }) => {
  return (
    <CumulationCountWrapper>
      <CumulationTitle>총누적거리</CumulationTitle>
      <Number>: {cumulatedDistance} km</Number>
    </CumulationCountWrapper>
  );
};

export default CumulationCount;

const CumulationCountWrapper = styled.div`
  width: 250px;
  height: 100px;
  margin: 8px;
`;

const CumulationTitle = styled.span`
  font-size: 2.6rem;
  font-weight: 550;
  color: #3d5a80;
  top: 20px;
`;

const Number = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-top: 10px;
  text-shadow: 3px 4px 5px #adb5bd;
  color: #3d5a80;
`;
