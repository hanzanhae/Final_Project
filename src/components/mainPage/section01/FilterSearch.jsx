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
        <SearchOutlined />
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
  padding: 0.25rem 0.5rem;
  border: 1.2px solid #ccc;
  border-radius: 0.25rem;
`;
const SearchBtn = styled.button`
  color: #666;
`;
