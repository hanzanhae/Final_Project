import React, { useEffect, useRef, useState } from 'react';
import { UniBtn } from '../button/UniBtn';
import styled from 'styled-components';
import MembersBox from './MembersBox';
import {
  gatheringDetailMembersData,
  gatheringParticipation,
  gatheringParticipationCancle
} from '../../api/api';

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

  // 모임참가 작성중...🚂
  const handleEnterMeeting = async () => {
    if (enteredMembers.length < maxMember) {
      const response = await gatheringParticipation(gatheringId);
      if (response) {
        const newMembers = await gatheringDetailMembersData(gatheringId);
        setEnteredMembers(newMembers.content);
        setErrorMsg('모임참가신청이 완료되었습니다.');
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
