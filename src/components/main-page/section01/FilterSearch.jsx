import React, { useState } from 'react';

import SearchIcon from '../../../icons/search.svg';

import {
  BtnIcon,
  SearchBox,
  SearchBtn,
  SearchInput
} from '../../../styles/main-page/FilterMenuStyle';

const FilterSearch = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmitInput = (e) => {
    e.preventDefault();
    console.log(inputValue);
  };

  return (
    <SearchBox onSubmit={handleSubmitInput}>
      <SearchInput
        type="text"
        placeholder="검색어를 입력하세요"
        value={inputValue}
        onChange={handleChangeInputValue}
      />
      <SearchBtn type="submit">
        <BtnIcon src={SearchIcon} alt="search-icon" />
      </SearchBtn>
    </SearchBox>
  );
};

export default FilterSearch;
