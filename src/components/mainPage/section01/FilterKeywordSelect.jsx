import { CaretDownOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

const FilterKeywordSelect = ({
  handleResetFilters,
  handleShowFilter,
  tempOption,
  tempDistance,
  tempCategory
}) => {
  return (
    <>
      <FilterReset onClick={handleResetFilters}>필터해제</FilterReset>
      <FilterTitle onClick={handleShowFilter}>
        원하는 모임을 선택하세요 <CaretDownOutlined />
        {tempOption && <SeletedFilter>{tempOption}</SeletedFilter>}
        {tempDistance && <SeletedFilter>{tempDistance}</SeletedFilter>}
        {tempCategory.length > 0 &&
          tempCategory.map((category, idx) => (
            <SeletedFilter key={idx}>{category}</SeletedFilter>
          ))}
      </FilterTitle>
    </>
  );
};

export default FilterKeywordSelect;

// style
const FilterReset = styled.button`
  font-weight: 600;
  color: #555;
  opacity: 0.5;
  &:hover {
    opacity: 0.8;
  }
`;
const FilterTitle = styled.h3`
  font-size: 1rem;
  line-height: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const SeletedFilter = styled.span`
  width: 80px;
  height: 28px;
  text-align: center;
  background-color: ${({ theme }) => theme.pointColorLight};
  font-weight: 600;
  font-size: 0.8rem;
  border-radius: 1rem;
`;
