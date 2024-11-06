import React from 'react';
import styled from 'styled-components';
import InfoScript from './InfoScript';
import InfoLocation from './InfoLocation';
import InfoTime from './InfoTime';

const DetailInfo = ({ meet }) => {
  if (!meet) {
    return <div>모임 정보가 없습니다.</div>;
  }
  return (
    <InfoContaier>
      <InfoScript meet={meet} />
      <InfoTime meet={meet} />
      <InfoLocation meet={meet} />
    </InfoContaier>
  );
};

export default DetailInfo;

// style
const InfoContaier = styled.div`
  width: 67%;
  position: relative;
  top: -2rem;
  left: 0;
`;
