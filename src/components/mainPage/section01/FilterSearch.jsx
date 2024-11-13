import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const FilterSearch = ({ searchText, setSearchText }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmitSearchWord = (e) => {
    e.preventDefault();
    setSearchText(inputValue);
    setInputValue('');
    // console.log(inputValue);
  };
  // useEffect(() => {
  //   console.log(searchText);
  // }, [searchText]);

  return (
    <SearchBox onSubmit={handleSubmitSearchWord}>
      <SearchInput
        type="text"
        placeholder="검색어를 입력하세요"
        value={inputValue}
        onChange={handleChangeInputValue}
      />
      <SearchBtn type="submit">
        <Icon />
      </SearchBtn>
    </SearchBox>
  );
};

export default FilterSearch;

// style
const SearchBox = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const SearchInput = styled.input`
  width: 250px;
  padding: 0.5rem 0.5rem;
  border: 1.2px solid #ccc;
  border-radius: 0.25rem;
  &::placeholder {
    font-size: 1.1rem;
  }
  @media (max-width: 1440px) {
    width: 180px;
    padding: 0.25rem 0.5rem;
    &::placeholder {
      font-size: 0.8rem;
    }
  }
`;
const SearchBtn = styled.button`
  color: #666;
`;
const Icon = styled(SearchOutlined)`
  font-size: 1.5rem;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
`;
