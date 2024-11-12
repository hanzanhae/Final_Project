import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';
import { runningConcept, runningDistance } from '../../data/gatheringKeyword';

// 임시유저이미지
import UserImg from '../../images/person.jpg';

const InfoScript = ({ meet }) => {
  // const content = meet.content;

  // const listConcept = content.concept;
  // const concept = runningConcept(listConcept);

  // const listDistance = content.goal_distance;
  // const distance = runningDistance(listDistance);

  // const newDate = format(content.deadline, 'yyyy/MM/dd');

  // 임시
  const listConcept = meet.concept;
  const concept = runningConcept(listConcept);

  const listDistance = meet.goal_distance;
  const distance = runningDistance(listDistance);

  const newDate = format(meet.deadline, 'yyyy/MM/dd');

  return (
    <Infomation>
      <ProfileBox>
        <ProfileImg src={UserImg} alt="user-image" />
        {/* {meet.organizer_profile_url ? (
          <ProfileImg src={meet.organizer_profile_url}/>
        ) : (
          <ProfileImg src={UserImg} alt="user-image" />
        )} */}
        <Name>{meet.organizer_id}</Name>
        {/* <Name>{meet.organizer_nicknam}</Name> */}
      </ProfileBox>
      <InfoTextBox>
        <Title>{meet.title}</Title>
        {/* <Title>{content.title}</Title> */}
        <DescriptionBox>
          <KeywordBox>
            <Keywords>
              <Keyword>{distance}</Keyword>
              <Keyword>{concept}</Keyword>
            </Keywords>
            <Deadline>모집기한 : ~{newDate}</Deadline>
          </KeywordBox>
          <Description>{meet.title}</Description>
          {/* <Description>{content.description}</Description> */}
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
  width: 100px;
  aspect-ratio: 1/1;
  border-radius: 1.5rem;
  border: 3px solid ${({ theme }) => theme.pointColorLight};
`;

const Name = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
`;

const InfoTextBox = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: #333;
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
  width: 80px;
  background-color: ${({ theme }) => theme.pointColorLight};
  color: ${({ theme }) => theme.pointColor};
  font-size: 0.7rem;
  font-weight: 700;
  text-align: center;
  border-radius: 1rem;
`;
const Deadline = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
`;
const DescriptionBox = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
`;
const Description = styled.p`
  letter-spacing: 1px;
  line-height: 1.8;
`;
