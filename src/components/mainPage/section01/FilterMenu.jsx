import React from 'react';
import FilterKeyword from './FilterKeyword';
import FilterSearch from './FilterSearch';
import styled from 'styled-components';
import FilterMyLocation from './FilterMyLocation';

const FilterMenu = ({
  showAddress,
  setShowAddress,
  handleClickUserLocation,
  setGatheringIn10km,
  searchText,
  setSearchText
}) => {
  return (
    <FilterMenuWrapper>
      <FilterKeyword
        setGatheringIn10km={setGatheringIn10km}
        setShowAddress={setShowAddress}
        setSearchText={setSearchText}
      />
      <Box>
        <FilterMyLocation
          showAddress={showAddress}
          handleClickUserLocation={handleClickUserLocation}
        />
        <FilterSearch searchText={searchText} setSearchText={setSearchText} />
      </Box>
    </FilterMenuWrapper>
  );
};

export default FilterMenu;

// style
const FilterMenuWrapper = styled.div`
  width: 100%;
  height: 8vh;
  padding: 0 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  @media (max-width: 1440px) {
    padding: 0 5rem;
  }
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
