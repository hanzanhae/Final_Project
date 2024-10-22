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
  RegisterBtn,
  Title
} from '../../styles/detailPage/DetailStyle';

const DetailMember = ({ meet }) => {
  const memberRef = useRef(null);
  const [activeMember, setActiveMember] = useState(null);

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

  return (
    <MemberContaier>
      <RegisterBtn>모임참가하기</RegisterBtn>
      <MemberTitleBox>
        <Title>참여하는 사람들</Title>
        <MemberNumber>{meet.capacity}</MemberNumber>
      </MemberTitleBox>
      <MemberBox>
        {meet.members.map((member, idx) => (
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
    </MemberContaier>
  );
};

DetailMember.propTypes = {
  meet: PropTypes.shape({
    capacity: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default DetailMember;
