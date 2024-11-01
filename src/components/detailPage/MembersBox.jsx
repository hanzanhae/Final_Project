import React from 'react';
import styled from 'styled-components';
import MemberMenu from './MemberMenu';

const MembersBox = ({
  enterMembers,
  handleShowMemberMenu,
  memberRef,
  activeMember,
  setActiveMember
}) => {
  return (
    <MemberBox>
      {enterMembers.map((member, idx) => (
        <Member key={idx} onClick={() => handleShowMemberMenu(idx)}>
          {member}
          {activeMember === idx && (
            <MemberRef ref={memberRef}>
              <MemberMenu setActiveMember={setActiveMember} />
            </MemberRef>
          )}
        </Member>
      ))}
    </MemberBox>
  );
};

export default MembersBox;

// style
const MemberBox = styled.div`
  width: fit-content;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
const Member = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: #ececec;
  line-height: 44px;
  text-align: center;
  position: relative;
  border: 3px solid #fff;
  &:hover {
    border-color: ${({ theme }) => theme.pointColorLight};
  }
`;
const MemberRef = styled.div``;
