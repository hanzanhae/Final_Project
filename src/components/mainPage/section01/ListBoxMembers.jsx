import { TeamOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

const ListBoxMembers = ({ list }) => {
  const members = list.member_profile_urls;
  const maxMember = list.max_number;
  return (
    <MemberBox>
      <Members>
        {members.map((member, idx) => (
          <Member key={idx} $index={idx}>
            {member?.slice(0, 2)}
          </Member>
        ))}
      </Members>
      <Capacity>
        <UserIcon>
          <TeamOutlined />
        </UserIcon>
        {`${members.length}/${maxMember}`}
      </Capacity>
    </MemberBox>
  );
};

export default ListBoxMembers;

// style
const MemberBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Members = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
const Member = styled.p`
  width: 36px;
  height: 36px;
  font-size: 0.6rem;
  border: 3px solid #fff;
  border-radius: 100%;
  background-color: #ececec;
  text-align: center;
  line-height: 30px;
  position: absolute;
  left: ${(props) => props.$index * 30}px;
`;
const Capacity = styled.div`
  font-size: 0.8rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;
const UserIcon = styled.div`
  color: #ccc;
`;
