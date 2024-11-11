import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MeetingCard from './MeetingCard';
import CompleteModal from './CompleteModal';
import { fetchMeetings } from '../../api/api';

const MyMeetings = () => {
  const [activeTab, setActiveTab] = useState('created');
  const [createdMeetings, setCreatedMeetings] = useState([]);
  const [participatingMeetings, setParticipatingMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = {
    memberRole: 'organizer',
    gatheringTimeStatus: 'NORMAL',
    orderBy: 'appointed_at',
    sortDirection: 'ASC',
    gatheringType: 'HEALTH'
  };

  useEffect(() => {
    const loadMeetings = async () => {
      const data = await fetchMeetings(params);

      if (data) {
        setCreatedMeetings(
          data.filter((meeting) => meeting.organizer_id === 1)
        );
        setParticipatingMeetings(
          data.filter((meeting) => meeting.current_number > 0)
        );
      }
    };

    loadMeetings();
  }, [params]);

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
          $isActive={activeTab === 'created'}
          onClick={() => handleTabClick('created')}
        >
          내가 만든 모임
        </Tab>
        <Tab
          $isActive={activeTab === 'participating'}
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
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.pointColorLight : '#eee'};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.pointColor : '#c2c2c2'};
  border: none;
  cursor: pointer;
`;

const MeetingList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MyMeetings;
