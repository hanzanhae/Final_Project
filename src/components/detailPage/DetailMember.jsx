import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { UniBtn } from '../button/UniBtn';
import styled from 'styled-components';
import MembersBox from './MembersBox';

const DetailMember = ({ meet }) => {
  if (!meet) {
    return <div>모임 정보가 없습니다.</div>;
  }
  // 🚂...임시
  const members = meet.member_profile_urls;
  const maxMember = meet.max_number;

  // const memberRef = useRef(null);

  // const [activeMember, setActiveMember] = useState(null);
  // const [enterMembers, setEnterMembers] = useState([]);
  // const [errorMsg, setErrorMsg] = useState('');

  // const handleShowMemberMenu = (index) => {
  //   setActiveMember(activeMember === index ? null : index);
  // };

  // const handleClickOutside = (e) => {
  //   if (memberRef.current && !memberRef.current.contains(e.target)) {
  //     setActiveMember(null);
  //   }
  // };

  // useEffect(() => {
  //   const enteredMembers = Array.from({ length: meet.capacity }, (_, idx) => {
  //     return `이름${idx + 1}`;
  //   });
  //   setEnterMembers(enteredMembers);

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [setActiveMember]);

  // const handleEnterMeeting = () => {
  //   if (enterMembers.length < 10) {
  //     const newMember = `이름${enterMembers.length + 1}`;
  //     setEnterMembers((prev) => [...prev, newMember]);
  //   } else {
  //     setErrorMsg(
  //       '최대인원을 초과하였습니다. 모임에 참가하고 싶은 경우, 모임장에게 직접 연락하시길 바랍니다.'
  //     );
  //   }
  // };

  return (
    <MemberContainer>
      <UniBtn
        // onClick={handleEnterMeeting}
        $margin="0 0 2rem 0"
        $padding="0.5rem 1rem"
      >
        모임참가하기
      </UniBtn>
      <MemberTitleBox>
        <Title>참여하는 사람들</Title>
        <MemberNumber>{`${members.length}/${maxMember}`}</MemberNumber>
      </MemberTitleBox>
      <MembersBox
        // enterMembers={enterMembers}
        members={members.slice(0, 2)}
        //
        // handleShowMemberMenu={handleShowMemberMenu}
        // memberRef={memberRef}
        // activeMember={activeMember}
        // setActiveMember={setActiveMember}
      />
      {/* <Msg>{errorMsg}</Msg> */}
    </MemberContainer>
  );
};

// DetailMember.propTypes = {
//   meet: PropTypes.shape({
//     member_profile_urls: PropTypes.arrayOf(PropTypes.string).isRequired,
//     max_number: PropTypes.number.isRequired
//   })
// };
// DetailMember.defaultProps = {
//   meet: {
//     member_profile_urls: [],
//     max_number: 10
//   }
// };

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
