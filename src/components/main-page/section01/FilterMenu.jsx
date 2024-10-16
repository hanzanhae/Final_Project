import React from 'react';
import styled from 'styled-components';

import SearchIcon from '../../../icons/search.svg';

const FilterMenu = () => {
  return (
    <FilterBox>
      <FilterUl>
        <FilterLi>필터1</FilterLi>
        <FilterLi>필터2</FilterLi>
        <FilterLi>필터3</FilterLi>
      </FilterUl>
      <SearchBox>
        <SearchInput type="text" placeholder="검색어를 입력하세요" />
        <SearchBtn>
          <BtnIcon src={SearchIcon} alt="search-icon" />
        </SearchBtn>
      </SearchBox>
    </FilterBox>
  );
};

export default FilterMenu;

// style
const FilterBox = styled.div`
  width: 100%;
  padding: 1rem 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.pointColorLight};
`;
const FilterUl = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
const FilterLi = styled.li`
  cursor: pointer;
  font-weight: 500;
`;
const SearchBox = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const SearchInput = styled.input`
  padding: 0.25rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.pointColor};
  border-radius: 0.25rem;
`;
const SearchBtn = styled.button``;
const BtnIcon = styled.img`
  width: 1.2rem;
`;
