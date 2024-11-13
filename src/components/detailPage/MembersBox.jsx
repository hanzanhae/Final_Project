import React from 'react';
import styled from 'styled-components';
import MemberMenu from './MemberMenu';

const MembersBox = ({
  enteredMembers,
  handleShowMemberMenu,
  memberRef,
  activeMember,
  setActiveMember,
  handleOutMeeting,
  openDirectChat
}) => {
  return (
    <MemberBox>
      {enteredMembers.map((member) => {
        const id = member?.member_id || null;
        const nickname = member?.nickname || '없음';
        const accountId = member?.member_account_id || null;
        return (
          <Member key={id} onClick={() => handleShowMemberMenu(id)}>
            {nickname.slice(0, 4)}
            {activeMember === id && (
              <MemberRef ref={memberRef}>
                <MemberMenu
                  setActiveMember={setActiveMember}
                  openDirectChat={(roomId, nickName) =>
                    openDirectChat(roomId, nickname)
                  }
                  memberNickName={nickname}
                  memberId={accountId}
                  handleOutMeeting={() => handleOutMeeting(id)}
                />
              </MemberRef>
            )}
          </Member>
        );
      })}
    </MemberBox>
  );
};

export default MembersBox;

// style
const MemberBox = styled.div`
  width: fit-content;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 1440px) {
    border-width: 1.5px;
    padding: 0.5rem;
  }
`;
const Member = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-color: #ececec;
  line-height: 54px;
  text-align: center;
  position: relative;
  border: 3px solid #fff;
  &:hover {
    border-color: ${({ theme }) => theme.pointColorLight};
  }

  @media (max-width: 1440px) {
    width: 50px;
    height: 50px;
    line-height: 44px;
  }
`;
const MemberRef = styled.div``;
