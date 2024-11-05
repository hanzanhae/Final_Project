import React, { useState } from 'react';
import styled from 'styled-components';

const CompleteModal = ({ meeting, closeModal }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const toggleMember = (memberId) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleComplete = async () => {
    await fetch(`/api/meetings/${meeting.id}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completedMembers: selectedMembers })
    });
    closeModal();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>완료한 크루들</ModalHeader>
        {meeting.members.map((member) => (
          <Member key={member.id}>
            <input
              type="checkbox"
              checked={selectedMembers.includes(member.id)}
              onChange={() => toggleMember(member.id)}
            />
            {member.name}
          </Member>
        ))}
        <ButtonWrapper>
          <Button onClick={handleComplete}>완료</Button>
          <Button onClick={closeModal}>취소</Button>
        </ButtonWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

//스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
`;

const ModalHeader = styled.h3`
  display: flex;
  justify-content: center;
`;

const Member = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  border: none;
  background-color: ${({ theme }) => theme.pointColor};
  color: white;
  cursor: pointer;
  &:last-child {
    background-color: #ccc;
  }
`;

export default CompleteModal;
