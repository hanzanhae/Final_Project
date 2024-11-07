import React, { useEffect, useRef, useState } from 'react';
import { UniBtn } from '../button/UniBtn';
import styled from 'styled-components';
import MembersBox from './MembersBox';
import { gatheringParticipation } from '../../api/api';

const DetailMember = ({ meet }) => {
  if (!meet) {
    return <div>모임 정보가 없습니다.</div>;
  }
  // if (!members) {
  //   return <div>모임구성원 정보가 없습니다.</div>;
  // }

  const memberRef = useRef(null);

  // 🚂...임시
  const gatheringId = meet.id;
  const members = meet.member_profile_urls;
  const maxMember = meet.max_number;

  const [enteredMembers, setEnteredMembers] = useState([]);
  const [activeMember, setActiveMember] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  // 참가여부
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    if (members.length > 0) {
      setEnteredMembers([...members]);
    }
  }, [members]);

  const handleShowMemberMenu = (index) => {
    setActiveMember(activeMember === index ? null : index);
  };

  const handleClickOutside = (e) => {
    if (memberRef.current && !memberRef.current.contains(e.target)) {
      setActiveMember(null);
    }
  };

  useEffect(() => {
    const enteredMembers = Array.from({ length: meet.capacity }, (_, idx) => {
      return `이름${idx + 1}`;
    });
    setEnteredMembers(enteredMembers);

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setActiveMember]);

  const handleEnterMeeting = async () => {
    if (enteredMembers.length < 10) {
      // 모임참가 작성중...
      const response = await gatheringParticipation(gatheringId);

      if (response) {
        const newMember = `이름${enteredMembers.length + 1}`;
        setEnteredMembers((prev) => [...prev, newMember]);
        setIsEntered(true);
      } else {
        setErrorMsg('모임 참가에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      setErrorMsg(
        '최대인원을 초과하였습니다. 모임에 참가하고 싶은 경우, 모임장에게 직접 연락하시길 바랍니다.'
      );
    }
  };

  return (
    <MemberContainer>
      <UniBtn onClick={handleEnterMeeting} $padding="0.5rem 1rem">
        모임참가하기
      </UniBtn>
      <IsEnteredNotice>
        {isEntered
          ? '현재 모임에 참가하였습니다.'
          : '현재 모임에 참가하지 않았습니다.'}
      </IsEnteredNotice>
      <MemberTitleBox>
        <Title>참여하는 사람들</Title>
        <MemberNumber>{`${members.length}/${maxMember}`}</MemberNumber>
      </MemberTitleBox>
      <MembersBox
        enteredMembers={enteredMembers}
        handleShowMemberMenu={handleShowMemberMenu}
        memberRef={memberRef}
        activeMember={activeMember}
        setActiveMember={setActiveMember}
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
const IsEnteredNotice = styled.div`
  margin: 0.5rem 0 2rem 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.pointColor};
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
  font-size: 1.1rem;
  color: #333;
`;
const MemberNumber = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
`;
const Msg = styled.div`
  margin-top: 2rem;
  padding: 0 0.5rem;
  color: red;
  font-size: 0.8rem;
  font-weight: 600;
`;
