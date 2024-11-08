import React from 'react';
import FilterMenu from './section01/FilterMenu';
import MeetingList from './section01/MeetingList';
import styled from 'styled-components';
import useUserLocation from '../../hooks/useUserLocation';

const Section01 = () => {
  const { location } = useUserLocation();
  return (
    <Wrapper>
      <FilterMenu location={location} />
      <MeetingList />
    </Wrapper>
  );
};

export default Section01;

// style
const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.bgColorPage};
`;
