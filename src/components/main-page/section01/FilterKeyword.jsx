import React, { useState } from 'react';

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
} from '../../../styles/main-page/FilterMenuStyle';

const FilterKeyword = ({ distance, category }) => {
  const [isFilterShow, setIsFilterShow] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleShowFilter = () => {
    setIsFilterShow(!isFilterShow);
  };
  const handleCloseFilter = () => {
    setIsFilterShow(false);
  };

  const handleSelectDistance = (distance) => {
    setSelectedDistance(distance);
  };
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };
  return (
    <FilterBox>
      <FilterTitle onClick={handleShowFilter}>
        원하는 모임을 선택하세요 <BtnIcon src={ArrowDownIcon} />
        {selectedDistance && (
          <SeletedFilter>{selectedDistance && `${selectedDistance}km`}</SeletedFilter>
        )}
        {selectedCategory && (
          <SeletedFilter>{selectedCategory && `${selectedCategory}`}</SeletedFilter>
        )}
      </FilterTitle>
      {isFilterShow && (
        <UlContainer>
          <CloseBtn onClick={handleCloseFilter}>
            <BtnIcon src={CloseIcon} />
          </CloseBtn>
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
                  isSelected={selectedCategory === category}
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

export default FilterKeyword;
