import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MeetingCard from './MeetingCard';
import CompleteModal from './CompleteModal';
import { createdMeetingsData, participatingMeetingsData } from './meetingData';

const MyMeetings = () => {
  const [activeTab, setActiveTab] = useState('created'); // "created" or "participating"
  const [createdMeetings, setCreatedMeetings] = useState([]);
  const [participatingMeetings, setParticipatingMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMeetings = async () => {
      // try {

      //   const response = await fetch('api 주소');

      //   if (!response.ok) throw new Error('데이터 가져오기 실패했습니다');
      //   const data = await response.json();

      //   setCreatedMeetings(data.createdMeetings || createdMeetingsData);
      //   setParticipatingMeetings(
      //     data.participatingMeetings || participatingMeetingsData
      //   );
      // } catch (error) {
      //   console.error('Error fetching meetings:', error);

      setCreatedMeetings(createdMeetingsData);
      setParticipatingMeetings(participatingMeetingsData);
    };

    fetchMeetings();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCompleteClick = (meeting) => {
    setSelectedMeeting(meeting);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeeting(null);
  };

  return (
    <Container>
      <Tabs>
        <Tab
          isActive={activeTab === 'created'}
          onClick={() => handleTabClick('created')}
        >
          내가 만든 모임
        </Tab>
        <Tab
          isActive={activeTab === 'participating'}
          onClick={() => handleTabClick('participating')}
        >
          참여 중인 모임
        </Tab>
      </Tabs>

      <MeetingList>
        {(activeTab === 'created'
          ? createdMeetings
          : participatingMeetings
        ).map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
            onCompleteClick={() => handleCompleteClick(meeting)}
          />
        ))}
      </MeetingList>

      {isModalOpen && selectedMeeting && (
        <CompleteModal meeting={selectedMeeting} closeModal={closeModal} />
      )}
    </Container>
  );
};

// 스타일
const Container = styled.div`
  width: 70%;
  margin: auto;
  padding: 20px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
`;

const Tab = styled.button`
  padding: 15px 25px;
  font-size: 18px;
  font-weight: bold;
  background-color: ${({ isActive }) =>
    isActive ? ({ theme }) => theme.pointColorLight : '#eee'};
  color: ${({ isActive }) =>
    isActive ? ({ theme }) => theme.pointColor : '#c2c2c2'};
  border: none;
  cursor: pointer;
`;

const MeetingList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MyMeetings;
