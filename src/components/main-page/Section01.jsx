import React from 'react';
import styled from 'styled-components';
import FilterMenu from './section01/FilterMenu';
import MeetingList from './section01/MeetingList';

const Section01 = () => {
  return (
    <Warpper>
      <FilterMenu />
      <MeetingList />
    </Warpper>
  );
};

export default Section01;

// style
const Warpper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;
