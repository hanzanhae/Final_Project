import React from 'react';
import styled from 'styled-components';
import {
  categoryList,
  distanceList,
  optionList
} from '../../../data/gatheringKeyword';

const FilterKeywordMenuLists = ({
  handleSelectOption,
  handleSelectDistance,
  handleSelectCategory,
  tempOption,
  tempDistance,
  tempCategory
}) => {
  const lists = [
    {
      title: '참가',
      items: optionList,
      selected: tempOption,
      selectHandler: handleSelectOption
    },
    {
      title: '키로수',
      items: distanceList,
      selected: tempDistance,
      selectHandler: handleSelectDistance
    },
    {
      title: '키워드',
      items: categoryList,
      selected: tempCategory,
      selectHandler: handleSelectCategory
    }
  ];

  return (
    <>
      {lists.map(({ title, items, selected, selectHandler }) => (
        <ContainerInner key={title}>
          <UlTitle>{title}</UlTitle>
          <Ul>
            {items.map((item) => (
              <Li
                key={item}
                onClick={() => selectHandler(item)}
                $isSelected={
                  Array.isArray(selected)
                    ? selected.includes(item)
                    : selected === item
                }
              >
                {item}
              </Li>
            ))}
          </Ul>
        </ContainerInner>
      ))}
    </>
  );
};

export default FilterKeywordMenuLists;

// style
const ContainerInner = styled.div`
  width: 100%;
  padding: 0 1rem;
  @media (max-width: 1440px) {
    padding: 0;
  }
`;
const UlTitle = styled.h4`
  font-size: 1.1rem;
  @media (max-width: 1440px) {
    font-size: 0.9rem;
  }
`;
const Ul = styled.ul`
  margin: 0.6rem 0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  @media (max-width: 1440px) {
    gap: 1rem;
  }
`;
const Li = styled.li`
  width: 100px;
  padding: 0.5rem;
  border-radius: 2rem;
  text-align: center;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.pointColorLight : '#efefef'};
  &:hover {
    background-color: ${({ theme }) => theme.pointColorLight};
  }
  @media (max-width: 1440px) {
    font-size: 0.8rem;
  }
`;
