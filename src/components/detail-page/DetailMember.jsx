import React, { useState } from 'react';
import MemberMenu from './MemberMenu';
import PropTypes from 'prop-types';
// style
import {
  Member,
  MemberBox,
  MemberContaier,
  MemberNumber,
  MemberTitle,
  MemberTitleBox,
  RegisterBtn
} from '../../styles/detail-page/DetailStyle';

const DetailMember = ({ meet }) => {
  const [activeMember, setActiveMember] = useState(null);
  // const [isShowMemberMenu, setIsShowMemberMenu] = useState(false);

  const handleShowMemberMenu = (index) => {
    setActiveMember(activeMember === index ? null : index);
  };

  return (
    <MemberContaier>
      <RegisterBtn>모임참가하기</RegisterBtn>
      <MemberTitleBox>
        <MemberTitle>참여하는 사람들</MemberTitle>
        <MemberNumber>{meet.capacity}</MemberNumber>
      </MemberTitleBox>
      <MemberBox>
        {meet.members.map((member, idx) => (
          <Member key={idx} onClick={() => handleShowMemberMenu(idx)}>
            {member}
            {activeMember === idx && <MemberMenu />}
          </Member>
        ))}
      </MemberBox>
    </MemberContaier>
  );
};

DetailMember.propTypes = {
  meet: PropTypes.shape({
    capacity: PropTypes.string.isRequired,
    members: PropTypes.string.isRequired
  }).isRequired
};

export default DetailMember;
