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

  const memberRole = 'organizer'; // 예시: 'organizer' or 'participant'
  const gatheringTimeStatus = 'NORMAL'; // 예시: 'NORMAL' or 다른 상태 값
  const orderBy = 'appointed_at'; // 정렬 기준
  const sortDirection = 'ASC'; // 'ASC' 또는 'DESC'
  const gatheringType = 'HEALTH'; // 예시 값, 'HEALTH', 'SPORTS' 등

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        // 쿼리 파라미터 설정
        const params = new URLSearchParams({
          memberRole, // 사용자가 선택한 모임 역할 (주최자 또는 참여자)
          gatheringTimeStatus, // 모임 상태 (예: 'NORMAL', 'ENDED' 등)
          orderBy, // 정렬 기준 (예: 'appointed_at')
          sortDirection, // 정렬 방향 ('ASC' 또는 'DESC')
          gatheringType // 모임 타입 (예: 'HEALTH', 'SPORTS' 등)
        });

        const response = await fetch(`/users/gatherings?${params.toString()}`);

        if (!response.ok) {
          throw new Error('데이터 가져오기 실패했습니다');
        }

        const data = await response.json();

        setCreatedMeetings(
          data.user_gathering_responses.content.filter(
            (meeting) => meeting.organizer_id === 1
          )
        );

        setParticipatingMeetings(
          data.user_gathering_responses.content.filter(
            (meeting) => meeting.current_number > 0
          )
        );
      } catch (error) {
        console.error('Error fetching meetings:', error);

        // 로컬 mock 데이터로 처리
        setCreatedMeetings(createdMeetingsData);
        setParticipatingMeetings(participatingMeetingsData);
      }
    };

    fetchMeetings();
  }, [memberRole, gatheringTimeStatus, orderBy, sortDirection, gatheringType]);

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
