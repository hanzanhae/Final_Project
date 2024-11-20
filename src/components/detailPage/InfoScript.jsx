import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';
import { runningConcept, runningDistance } from '../../data/gatheringKeyword';

import UserImg from '../../images/person.jpg';

const InfoScript = ({ meet }) => {
  const content = meet.content;

  const listConcept = content?.concept;
  const concept = runningConcept(listConcept);

  const listDistance = content?.goal_distance;
  const distance = runningDistance(listDistance);

  const listDeadline = new Date(content?.deadline);
  const newDate = format(listDeadline, 'yyyy/MM/dd');

  return (
    <Infomation>
      <ProfileBox>
        <ProfileImg src={UserImg} alt="user-image" />
        <Name>
          <Span>모임장. </Span>
          {meet.organizer_nickname.slice(0, 3)}님
        </Name>
      </ProfileBox>
      <InfoTextBox>
        <Title>{content?.title}</Title>
        <DescriptionBox>
          <KeywordBox>
            <Keywords>
              <Keyword>{distance}</Keyword>
              <Keyword>{concept}</Keyword>
            </Keywords>
            <Deadline>모집기한 : ~{newDate}</Deadline>
          </KeywordBox>
          <Description>{content?.description}</Description>
        </DescriptionBox>
      </InfoTextBox>
    </Infomation>
  );
};

export default InfoScript;

// style
const Infomation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ProfileBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
`;
const ProfileImg = styled.img`
  width: 150px;
  aspect-ratio: 1/1;
  border-radius: 1.5rem;
  border: 5px solid ${({ theme }) => theme.pointColorLight};
  @media (max-width: 1440px) {
    width: 100px;
    border-width: 3px;
  }
`;

const Span = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #666;
  @media (max-width: 1440px) {
    font-size: 0.8rem;
  }
`;
const Name = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
`;

const InfoTextBox = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #333;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
`;

const KeywordBox = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Keywords = styled.div`
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
    width: 80px;
    font-size: 0.8rem;
  }
`;
const Deadline = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #666;
  @media (max-width: 1440px) {
    font-size: 0.8rem;
  }
`;
const DescriptionBox = styled.div`
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
  @media (max-width: 1440px) {
    border-width: 1.5px;
  }
`;
const Description = styled.p`
  font-size: 1.2rem;
  letter-spacing: 1px;
  line-height: 1.8;
  @media (max-width: 1440px) {
    font-size: 1rem;
  }
`;
