import React from 'react';
import FilterMenu from './section01/FilterMenu';
import MeetingList from './section01/MeetingList';
import styled from 'styled-components';

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
  background-color: #fff;
`;
