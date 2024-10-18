import React from 'react';
import FilterKeyword from './FilterKeyword';
import FilterSearch from './FilterSearch';

import { FilterMenuWrapper } from '../../../styles/main-page/FilterMenuStyle';

const distance = ['자유', '3', '5', '15', '21.0975', '42.195'];
const category = ['런린이', '고인물', '마라톤', '모닝런닝', '퇴근런닝', '건강'];
const option = ['전체', '참여가능'];

const FilterMenu = () => {
  return (
    <FilterMenuWrapper>
      <FilterKeyword distance={distance} category={category} option={option} />
      <FilterSearch />
    </FilterMenuWrapper>
  );
};

export default FilterMenu;
