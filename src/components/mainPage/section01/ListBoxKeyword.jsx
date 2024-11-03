import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';

const ListBoxKeyword = ({ list }) => {
  // 컨셉목록🚂
  const listConcept = list.concept;
  const runningConcept = (con) => {
    switch (con) {
      case 'RUNLINI':
        return '런린이';
      case 'GOINMUL':
        return '고인물';
      case 'MARATHON':
        return '마라톤';
      case 'MORNING_RUNNING':
        return '모닝런닝';
      case 'EVENING_RUNNING':
        return '퇴근런닝';
      case 'HEALTH':
        return '건강';
      default:
        return '';
    }
  };
  const concept = runningConcept(listConcept);

  // 거리목록🚂
  const listDistance = list.goal_distance;
  const runningDistance = (dis) => {
    switch (dis) {
      case 'FREE':
        return '자유';
      case 'THREE_KM':
        return '3km';
      case 'FIVE_KM':
        return '5km';
      case 'FIFTEEN_KM':
        return '15km';
      case 'HALF_MARATHON':
        return '하프(21.0975km)';
      case 'FULL_MARATHON':
        return '풀(42.195km)';
      default:
        return '';
    }
  };
  const distance = runningDistance(listDistance);

  const newDate = format(list.deadline, 'yyyy/MM/dd');
  return (
    <KeywordBox>
      <KeywordText>
        <Keyword>{distance}</Keyword>
        <Keyword>{concept}</Keyword>
      </KeywordText>
      <KeywordDate>~{newDate}</KeywordDate>
      {/* <KeywordText>
        <Keyword>{list.distance}</Keyword>
        <Keyword>{list.category}</Keyword>
      </KeywordText>
      <KeywordDate>~{list.deadlineDate}</KeywordDate> */}
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
  font-size: 0.8rem;
`;
