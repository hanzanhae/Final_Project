import React from 'react';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import { UniBtn } from '../../button/UniBtn';
import FilterKeywordMenuLists from './FilterKeywordMenuLists';

const FilterKeywordMenu = ({
  handleCloseFilter,
  handleSelectOption,
  handleSelectDistance,
  handleSelectCategory,
  tempOption,
  tempDistance,
  tempCategory,
  handleApplyFilters
}) => {
  return (
    <>
      <UlContainer>
        <CloseBtn onClick={handleCloseFilter}>
          <CloseOutlined />
        </CloseBtn>
        <FilterKeywordMenuLists
          handleSelectOption={handleSelectOption}
          handleSelectDistance={handleSelectDistance}
          handleSelectCategory={handleSelectCategory}
          tempOption={tempOption}
          tempDistance={tempDistance}
          tempCategory={tempCategory}
        />
        <UniBtn onClick={handleApplyFilters} $margin="1rem 0 0 0">
          적용
        </UniBtn>
      </UlContainer>
    </>
  );
};

export default FilterKeywordMenu;

// style
const UlContainer = styled.div`
  margin-top: 0.5rem;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.pointColorLight};
  position: absolute;
  top: 1.8rem;
  left: -2rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;
