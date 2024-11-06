import React from 'react';
import FilterKeyword from './FilterKeyword';
import FilterSearch from './FilterSearch';
import styled from 'styled-components';
import FilterMyLocation from './FilterMyLocation';

const FilterMenu = ({ location }) => {
  return (
    <FilterMenuWrapper>
      <FilterKeyword />
      <Box>
        <FilterMyLocation location={location} />
        <FilterSearch />
      </Box>
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
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
