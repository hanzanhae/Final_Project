import React, { useEffect, useRef, useState } from 'react';
import { UniBtn } from '../button/UniBtn';
import styled from 'styled-components';
import MembersBox from './MembersBox';
import {
  gatheringDetailMembersData,
  gatheringParticipation,
  gatheringParticipationCancle,
  postGroupChatJoin
} from '../../api/api';
import { useParams } from 'react-router-dom';

const DetailMember = ({ meet, membersList, openDirectChat }) => {
  if (!meet) {
    return <div>모임 정보가 없습니다.</div>;
  } else if (!membersList || membersList.length === 0) {
    return <div>모임구성원 정보가 없습니다.</div>;
  }
  // console.log(membersList);
  const memberRef = useRef(null);
  const gatheringId = meet.content.id;
  const maxMember = meet.content.max_number;
  const { id } = useParams();
  const [enteredMembers, setEnteredMembers] = useState([]);
  const [activeMember, setActiveMember] = useState(null);
  // 참가 및 취소오류 알림메세지
  const [errorMsg, setErrorMsg] = useState('');
  // 참가여부 알림메세지
  // const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    if (membersList.length > 0) {
      setEnteredMembers(membersList);
    }
  }, []);

  const handleShowMemberMenu = (index) => {
    setActiveMember(activeMember === index ? null : index);
  };
  const handleClickOutside = (e) => {
    if (memberRef.current && !memberRef.current.contains(e.target)) {
      setActiveMember(null);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setActiveMember]);

  // 채팅방 참여 요청 함수
  const joinChatRoom = async () => {
    try {
      const response = await postGroupChatJoin(id);
      console.log(id);
      console.log(response);

      if (response) {
        setErrorMsg('모임참가신청이 완료되었습니다.');
      } else {
        setErrorMsg('채팅방 참여에 실패했습니다.');
      }
    } catch (error) {
      console.error('채팅방 참여 처리 중 오류 발생:', error);
      setErrorMsg('채팅방 참여 중 오류가 발생했습니다.');
    }
  };

  // 모임참가 작성중...🚂
  const handleEnterMeeting = async () => {
    if (enteredMembers.length < maxMember) {
      try {
        // 1. 모임 참가 요청
        const response = await gatheringParticipation(gatheringId);

        if (response) {
          // 2. 모임 참가가 성공한 후 멤버 업데이트
          const newMembers = await gatheringDetailMembersData(gatheringId);
          setEnteredMembers(newMembers.content);

          // 3. 멤버 업데이트가 완료된 후 500ms 대기한 뒤 채팅방 참여 요청
          setTimeout(async () => {
            await joinChatRoom();
          }, 5000); // 500ms 대기 시간
        } else {
          setErrorMsg('모임 참가 신청에 실패했습니다.');
        }
      } catch (error) {
        console.error('참가 처리 중 오류 발생:', error);
        setErrorMsg('참가 처리 중 오류가 발생했습니다.');
      }
    } else {
      setErrorMsg(
        '최대인원을 초과하였습니다. 모임에 참가하고 싶은 경우, 모임장에게 직접 연락하시길 바랍니다.'
      );
    }
  };
  // 모임참가취소 작성중...🚂
  const handleOutMeeting = async (idToDel) => {
    const response = await gatheringParticipationCancle(gatheringId);
    if (response) {
      setEnteredMembers((prevMembers) =>
        prevMembers.filter((member) => member.member_id !== idToDel)
      );
      setErrorMsg('모임참가신청이 취소되었습니다.');
    } else {
      setErrorMsg('모임 참가취소에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <MemberContainer>
      <UniBtn
        onClick={handleEnterMeeting}
        $padding="0.5rem 1rem"
        $margin="0 0 2rem 0"
      >
        모임참가하기
      </UniBtn>
      <MemberTitleBox>
        <Title>참여하는 사람들</Title>
        <MemberNumber>{`${enteredMembers.length}/${maxMember}`}</MemberNumber>
      </MemberTitleBox>
      <MembersBox
        enteredMembers={enteredMembers}
        handleShowMemberMenu={handleShowMemberMenu}
        memberRef={memberRef}
        activeMember={activeMember}
        setActiveMember={setActiveMember}
        handleOutMeeting={handleOutMeeting}
        openDirectChat={openDirectChat}
      />
      <Msg>{errorMsg}</Msg>
    </MemberContainer>
  );
};

export default DetailMember;

// style
const MemberContainer = styled.div`
  margin-top: 100px;
  width: 26%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const MemberTitleBox = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
  color: #333;
  @media (max-width: 1440px) {
    font-size: 1.1rem;
  }
`;
const MemberNumber = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #666;
  @media (max-width: 1440px) {
    font-size: 0.9rem;
  }
`;
const Msg = styled.div`
  margin-top: 2rem;
  padding: 0 0.5rem;
  color: red;
  font-size: 0.8rem;
  font-weight: 600;
`;
