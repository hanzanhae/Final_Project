import React, { useEffect, useRef, useState } from 'react';
import MemberMenu from './MemberMenu';
import PropTypes from 'prop-types';

// style
import {
  Member,
  MemberBox,
  MemberContaier,
  MemberNumber,
  MemberTitleBox,
  Msg,
  RegisterBtn,
  Title
} from '../../styles/detailPage/DetailStyle';

const DetailMember = ({ meet }) => {
  const memberRef = useRef(null);
  const [activeMember, setActiveMember] = useState(null);
  const [enterMembers, setEnterMembers] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

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
    setEnterMembers(enteredMembers);

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setActiveMember]);

  const handleEnterMeeting = () => {
    if (enterMembers.length < 10) {
      const newMember = `이름${enterMembers.length + 1}`;
      setEnterMembers((prev) => [...prev, newMember]);
    } else {
      setErrorMsg(
        '최대인원을 초과하였습니다. 모임에 참가하고 싶은 경우, 모임장에게 직접 연락하시길 바랍니다.'
      );
    }
  };

  return (
    <MemberContaier>
      <RegisterBtn onClick={handleEnterMeeting}>모임참가하기</RegisterBtn>
      <MemberTitleBox>
        <Title>참여하는 사람들</Title>
        <MemberNumber>{`${enterMembers.length}/10`}</MemberNumber>
      </MemberTitleBox>
      <MemberBox>
        {enterMembers.map((member, idx) => (
          <Member key={idx} onClick={() => handleShowMemberMenu(idx)}>
            {member}
            {activeMember === idx && (
              <div ref={memberRef}>
                <MemberMenu setActiveMember={setActiveMember} />
              </div>
            )}
          </Member>
        ))}
      </MemberBox>
      <Msg>{errorMsg}</Msg>
    </MemberContaier>
  );
};

DetailMember.propTypes = {
  meet: PropTypes.shape({
    capacity: PropTypes.number.isRequired,
    members: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default DetailMember;
