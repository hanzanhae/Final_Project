import React from 'react';
import styled from 'styled-components';

const ListBoxKeyword = ({ list }) => {
  return (
    <KeywordBox>
      <KeywordText>
        <Keyword>{list.distance}</Keyword>
        <Keyword>{list.category}</Keyword>
      </KeywordText>
      <KeywordDate>~{list.deadlineDate}</KeywordDate>
    </KeywordBox>
  );
};

export default ListBoxKeyword;

// style
const KeywordBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const KeywordText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Keyword = styled.p`
  padding: 0.25rem;
  width: 80px;
  background-color: ${({ theme }) => theme.pointColorLight};
  color: ${({ theme }) => theme.pointColor};
  font-size: 0.7rem;
  font-weight: 700;
  text-align: center;
  border-radius: 1rem;
`;
const KeywordDate = styled.p`
  color: #666;
`;
