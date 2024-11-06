import { format } from 'date-fns';
//import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { runningConcept, runningDistance } from '../../data/gatheringKeyword';

const InfoScript = ({ meet }) => {
  const listConcept = meet.concept;
  const concept = runningConcept(listConcept);

  const listDistance = meet.goal_distance;
  const distance = runningDistance(listDistance);

  const newDate = format(meet.deadline, 'yyyy/MM/dd');

  return (
    <Infomation>
      <ProfileBox>
        <ProfileImg />
        <Name>{meet.organizer_id}</Name>
      </ProfileBox>
      <InfoTextBox>
        <Title>{meet.title}</Title>
        <DescriptionBox>
          <KeywordBox>
            <Keywords>
              <Keyword>{distance}</Keyword>
              <Keyword>{concept}</Keyword>
            </Keywords>
            <Deadline>모집기한 : ~{newDate}</Deadline>
          </KeywordBox>
          <Description>{meet.title}</Description>
        </DescriptionBox>
      </InfoTextBox>
      {/* <ProfileBox>
        <ProfileImg />
        <Name>{meet.name}</Name>
      </ProfileBox>
      <InfoTextBox>
        <Title>{meet.title}</Title>
        <DescriptionBox>
          <KeywordBox>
            <Keywords>
              <Keyword>{meet.distance}</Keyword>
              <Keyword>{meet.category}</Keyword>
            </Keywords>
            <Deadline>모집기한 : ~{meet.deadlineDate}</Deadline>
          </KeywordBox>
          <Description>{meet.description}</Description>
        </DescriptionBox>
      </InfoTextBox> */}
    </Infomation>
  );
};
// InfoScript.propTypes = {
//   meet: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     distance: PropTypes.string.isRequired,
//     category: PropTypes.string.isRequired,
//     deadlineDate: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired
//   }).isRequired
// };
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
const ProfileImg = styled.div`
  width: 100px;
  aspect-ratio: 1/1;
  background-color: darkblue;
  border-radius: 1.5rem;
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
