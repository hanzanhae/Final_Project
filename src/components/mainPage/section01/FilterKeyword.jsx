import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import FilterKeywordSelect from './FilterKeywordSelect';
import FilterKeywordMenu from './FilterKeywordMenu';

const FilterKeyword = ({
  setGatheringIn10km,
  setShowAddress,
  setSearchText
}) => {
  const dispatch = useDispatch();
  const { selectedOption, selectedDistance, selectedCategory } = useSelector(
    (state) => state.filter
  );

  const [isFilterShow, setIsFilterShow] = useState(false);
  const [tempOption, setTempOption] = useState(selectedOption);
  const [tempDistance, setTempDistance] = useState(selectedDistance);
  const [tempCategory, setTempCategory] = useState(selectedCategory);

  const handleShowFilter = () => {
    setIsFilterShow(!isFilterShow);
  };
  const handleCloseFilter = () => {
    setIsFilterShow(false);
  };

  // 각각 필터선택 >> 카테고리만 다중선택 가능
  const handleSelectOption = (option) => {
    setTempOption(option);
  };
  const handleSelectDistance = (distance) => {
    setTempDistance(distance);
  };
  const handleSelectCategory = (category) => {
    const categories = tempCategory.includes(category)
      ? tempCategory.filter((c) => c !== category)
      : [...tempCategory, category];

    setTempCategory(categories);
  };

  const handleApplyFilters = () => {
    dispatch({ type: 'SELECTED_OPTION', payload: tempOption });
    dispatch({ type: 'SELECTED_DISTANCE', payload: tempDistance });
    dispatch({ type: 'SELECTED_CATEGORY', payload: tempCategory });
    handleCloseFilter();
  };

  const handleResetFilters = () => {
    dispatch({ type: 'SELECTED_OPTION', payload: null });
    dispatch({ type: 'SELECTED_DISTANCE', payload: null });
    dispatch({ type: 'SELECTED_CATEGORY', payload: [] });
    setTempOption(null);
    setTempDistance(null);
    setTempCategory([]);
    setGatheringIn10km([]);
    setShowAddress('');
    setSearchText('');
  };

  return (
    <FilterBox>
      <FilterKeywordSelect
        handleResetFilters={handleResetFilters}
        handleShowFilter={handleShowFilter}
        tempOption={tempOption}
        tempDistance={tempDistance}
        tempCategory={tempCategory}
      />
      {isFilterShow && (
        <FilterKeywordMenu
          handleCloseFilter={handleCloseFilter}
          handleSelectOption={handleSelectOption}
          handleSelectDistance={handleSelectDistance}
          handleSelectCategory={handleSelectCategory}
          tempOption={tempOption}
          tempDistance={tempDistance}
          tempCategory={tempCategory}
          handleApplyFilters={handleApplyFilters}
        />
      )}
    </FilterBox>
  );
};

export default FilterKeyword;

// style
const FilterBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
