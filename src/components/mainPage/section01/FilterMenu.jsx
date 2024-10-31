import React from 'react';
import FilterKeyword from './FilterKeyword';
import FilterSearch from './FilterSearch';
import styled from 'styled-components';

const FilterMenu = () => {
  return (
    <FilterMenuWrapper>
      <FilterKeyword />
      <FilterSearch />
    </FilterMenuWrapper>
  );
};

export default FilterMenu;

// style
const FilterMenuWrapper = styled.div`
  width: 100%;
  height: 8vh;
  padding: 0 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #ececec;
`;
