import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryList, distanceList, optionList } from '../../../data/meetingList';

// icon
import ArrowDownIcon from '../../../icons/arrow-down.svg';
import CloseIcon from '../../../icons/x-mark.svg';

// style
import {
  BtnIcon,
  CloseBtn,
  ContainerInner,
  FilterBox,
  FilterBtn,
  FilterReset,
  FilterTitle,
  Li,
  SeletedFilter,
  Ul,
  UlContainer,
  UlTitle
} from '../../../styles/mainPage/FilterMenuStyle';
import { UniBtn } from '../../button/UniBtn';

const FilterKeyword = () => {
  const option = optionList;
  const distance = distanceList;
  const category = categoryList;

  const dispatch = useDispatch();
  const { selectedOption, selectedDistance, selectedCategory } = useSelector(
    (state) => state.filter
  );

  const [isFilterShow, setIsFilterShow] = useState(false);
  const [tempOption, setTempOption] = useState(selectedOption);
  const [tempDistance, setTempDistance] = useState(selectedDistance);
  const [tempCategory, setTempCategory] = useState(selectedCategory);

  // 필터메뉴 on/off
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

  // 필터적용
  const handleApplyFilters = () => {
    dispatch({ type: 'SELECTED_OPTION', payload: tempOption });
    dispatch({ type: 'SELECTED_DISTANCE', payload: tempDistance });
    dispatch({ type: 'SELECTED_CATEGORY', payload: tempCategory });
    handleCloseFilter();
  };

  // 필터해제
  const handleResetFilters = () => {
    dispatch({ type: 'SELECTED_OPTION', payload: null });
    dispatch({ type: 'SELECTED_DISTANCE', payload: null });
    dispatch({ type: 'SELECTED_CATEGORY', payload: [] });
    setTempOption(null);
    setTempDistance(null);
    setTempCategory([]);
  };

  return (
    <FilterBox>
      <FilterReset onClick={handleResetFilters}>필터해제</FilterReset>
      <FilterTitle onClick={handleShowFilter}>
        원하는 모임을 선택하세요 <BtnIcon src={ArrowDownIcon} />
        {tempOption && <SeletedFilter>{tempOption}</SeletedFilter>}
        {tempDistance && <SeletedFilter>{tempDistance}</SeletedFilter>}
        {tempCategory.length > 0 &&
          tempCategory.map((category, idx) => <SeletedFilter key={idx}>{category}</SeletedFilter>)}
      </FilterTitle>
      {isFilterShow && (
        <UlContainer>
          <CloseBtn onClick={handleCloseFilter}>
            <BtnIcon src={CloseIcon} />
          </CloseBtn>
          <ContainerInner>
            <UlTitle>참가</UlTitle>
            <Ul>
              {option.map((option) => (
                <Li
                  key={option}
                  onClick={() => handleSelectOption(option)}
                  isSelected={tempOption === option}
                >
                  {option}
                </Li>
              ))}
            </Ul>
          </ContainerInner>
          <ContainerInner>
            <UlTitle>키로수</UlTitle>
            <Ul>
              {distance.map((distance) => (
                <Li
                  key={distance}
                  onClick={() => handleSelectDistance(distance)}
                  isSelected={tempDistance === distance}
                >
                  {distance}
                </Li>
              ))}
            </Ul>
          </ContainerInner>
          <ContainerInner>
            <UlTitle>키워드</UlTitle>
            <Ul>
              {category.map((category) => (
                <Li
                  key={category}
                  onClick={() => handleSelectCategory(category)}
                  isSelected={tempCategory.includes(category)}
                >
                  {category}
                </Li>
              ))}
            </Ul>
          </ContainerInner>
          <UniBtn onClick={handleApplyFilters} margin="1rem 0 0 0">
            적용
          </UniBtn>
        </UlContainer>
      )}
    </FilterBox>
  );
};

export default FilterKeyword;
