/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MeetingCard from './MeetingCard';
import CompleteModal from './CompleteModal';
import { fetchMeetings } from '../../api/api';
import { Link } from 'react-router-dom';

const MyMeetings = () => {
  const [activeTab, setActiveTab] = useState('created');
  const [createdMeetings, setCreatedMeetings] = useState([]);
  const [participatingMeetings, setParticipatingMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const creatParams = {
    gathering_type: 'GENERAL',
    member_role: 'ORGANIZER',
    order_by: 'CREATED_AT',
    sort_direction: 'DESC'
  };
  const partParams = {
    gathering_type: 'GENERAL',
    member_role: 'PARTICIPANT',
    order_by: 'CREATED_AT',
    sort_direction: 'DESC'
  };

  useEffect(() => {
    const loadMeetings = async () => {
      const createData = await fetchMeetings(creatParams);
      const partData = await fetchMeetings(partParams);

      if (createData) {
        const data = createData.user_gathering_responses.content;
        setCreatedMeetings(data);
      }
      if (partData) {
        console.log(partData);
        const data = partData.user_gathering_responses.content;
        console.log(data);
        setParticipatingMeetings(data);
      }
    };

    loadMeetings();
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
        {activeTab === 'created'
          ? createdMeetings.map((meeting) => {
              return (
                <div key={meeting.id}>
                  <MeetingCard
                    key={meeting.id}
                    meeting={meeting}
                    onCompleteClick={() => handleCompleteClick(meeting)}
                  />
                  {isModalOpen && selectedMeeting?.id === meeting.id && (
                    <CompleteModal
                      gatheringId={meeting.id}
                      closeModal={closeModal}
                    />
                  )}
                </div>
              );
            })
          : participatingMeetings.map((meeting) => (
              <Link to={`/gatherings/${meeting.id}`} key={meeting.id}>
                <MeetingCard meeting={meeting} />
              </Link>
            ))}
      </MeetingList>
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
