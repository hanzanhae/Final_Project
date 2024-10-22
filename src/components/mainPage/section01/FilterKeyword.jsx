import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ArrowDownIcon from '../../../icons/arrow-down.svg';
import CloseIcon from '../../../icons/x-mark.svg';

import {
  BtnIcon,
  CloseBtn,
  ContainerInner,
  FilterBox,
  FilterBtn,
  FilterTitle,
  Li,
  SeletedFilter,
  Ul,
  UlContainer,
  UlTitle
} from '../../../styles/mainPage/FilterMenuStyle';

const FilterKeyword = ({ distance, category, option }) => {
  const [isFilterShow, setIsFilterShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);

  // 필터메뉴 on/off
  const handleShowFilter = () => {
    setIsFilterShow(!isFilterShow);
  };
  const handleCloseFilter = () => {
    setIsFilterShow(false);
  };
  // 각각 필터선택 >> 카테고리만 다중선택 가능
  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };
  const handleSelectDistance = (distance) => {
    setSelectedDistance(distance);
  };
  const handleSelectCategory = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <FilterBox>
      <FilterTitle onClick={handleShowFilter}>
        원하는 모임을 선택하세요 <BtnIcon src={ArrowDownIcon} />
        {selectedOption && <SeletedFilter>{selectedOption}</SeletedFilter>}
        {selectedDistance && <SeletedFilter>{selectedDistance}</SeletedFilter>}
        {selectedCategory.length > 0 &&
          selectedCategory.map((category, idx) => (
            <SeletedFilter key={idx}>{category}</SeletedFilter>
          ))}
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
                  isSelected={selectedOption === option}
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
                  isSelected={selectedDistance === distance}
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
                  isSelected={selectedCategory.includes(category)}
                >
                  {category}
                </Li>
              ))}
            </Ul>
          </ContainerInner>
          <FilterBtn onClick={handleCloseFilter}>적용</FilterBtn>
        </UlContainer>
      )}
    </FilterBox>
  );
};

FilterKeyword.propTypes = {
  distance: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.arrayOf(PropTypes.string).isRequired,
  option: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default FilterKeyword;
