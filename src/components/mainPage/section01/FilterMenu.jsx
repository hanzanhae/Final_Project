import React from 'react';
import FilterKeyword from './FilterKeyword';
import FilterSearch from './FilterSearch';

// style
import { FilterMenuWrapper } from '../../../styles/mainPage/FilterMenuStyle';

const FilterMenu = () => {
  return (
    <FilterMenuWrapper>
      <FilterKeyword />
      <FilterSearch />
    </FilterMenuWrapper>
  );
};

export default FilterMenu;
