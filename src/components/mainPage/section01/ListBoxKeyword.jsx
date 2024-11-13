import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';
import {
  runningConcept,
  runningDistance
} from '../../../data/gatheringKeyword';

const ListBoxKeyword = ({ list }) => {
  const listConcept = list.concept;
  const concept = runningConcept(listConcept);

  const listDistance = list.goal_distance;
  const distance = runningDistance(listDistance);

  const newDate = format(list.deadline, 'yyyy/MM/dd');
  return (
    <KeywordBox>
      <KeywordText>
        <Keyword>{distance}</Keyword>
        <Keyword>{concept}</Keyword>
      </KeywordText>
      <KeywordDate>~{newDate}</KeywordDate>
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
  width: 100px;
  background-color: ${({ theme }) => theme.pointColorLight};
  color: ${({ theme }) => theme.pointColor};
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  border-radius: 2rem;
  @media (max-width: 1440px) {
    font-size: 0.7rem;
    width: 80px;
  }
`;
const KeywordDate = styled.p`
  color: #666;
  font-size: 1rem;
  @media (max-width: 1440px) {
    font-size: 0.8rem;
  }
`;
