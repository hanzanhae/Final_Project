import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CompleteModal = ({ gathering_id, closeModal }) => {
  const [membersData, setMembersData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMembersData = async () => {
      try {
        const response = await fetch(
          `/gatherings/${gathering_id}/members/attendance`
        );
        if (!response.ok) {
          throw new Error('크루 데이터를 불러오지 못했습니다.');
        }
        const data = await response.json();
        setMembersData(
          data.members.map((member) => ({
            member_id: member.id,
            name: member.name,
            status: '',
            real_distance: ''
          }))
        );
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchMembersData();
  }, [gathering_id]);

  const updateMemberData = (memberId, field, value) => {
    setMembersData((prevData) =>
      prevData.map((data) =>
        data.member_id === memberId ? { ...data, [field]: value } : data
      )
    );
  };

  const handleComplete = async () => {
    try {
      const response = await fetch(
        `/gatherings/${gathering_id}/members/attendance`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ members: membersData })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '출석체크 실패');
      }

      closeModal();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>러닝 완료</ModalHeader>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {membersData.map((member) => (
          <Member key={member.member_id}>
            <MemberName>{member.name}</MemberName>
            <Select
              value={member.status}
              onChange={(e) =>
                updateMemberData(member.member_id, 'status', e.target.value)
              }
            >
              <option value="">선택</option>
              <option value="ATTENDING">참가</option>
              <option value="NOT_ATTENDING">불참</option>
            </Select>
            <DistanceInput
              type="text"
              placeholder="거리 (km)"
              value={member.real_distance}
              onChange={(e) =>
                updateMemberData(
                  member.member_id,
                  'real_distance',
                  parseFloat(e.target.value) || ''
                )
              }
            />
          </Member>
        ))}
        <ButtonWrapper>
          <Button onClick={handleComplete}>완료</Button>
          <CancelButton onClick={closeModal}>취소</CancelButton>
        </ButtonWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

// 스타일
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
  padding: 24px;
  border-radius: 12px;
  width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.primaryColor || '#333'};
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 15px;
`;

const Member = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
`;

const MemberName = styled.span`
  flex: 1;
  font-size: 0.9rem;
`;

const Select = styled.select`
  flex: 1;
  width: 20%;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  font-size: 0.9rem;
  color: #333;
`;

const DistanceInput = styled.input`
  flex: 1;
  width: 30%;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  text-align: center;
  color: #333;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.pointColor || '#007BFF'};
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  margin-right: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor || '#0056b3'};
  }
`;

const CancelButton = styled(Button)`
  background-color: #ccc;
  margin-right: 0;

  &:hover {
    background-color: #b3b3b3;
  }
`;

export default CompleteModal;
