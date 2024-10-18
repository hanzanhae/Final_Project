import React from 'react';
import FilterMenu from './section01/FilterMenu';
import MeetingList from './section01/MeetingList';

import { Warpper } from '../../styles/main-page/MainStyle';

const Section01 = () => {
  return (
    <Warpper>
      <FilterMenu />
      <MeetingList />
    </Warpper>
  );
};

export default Section01;
