import React, { useState } from 'react';
import styled from 'styled-components';
import ChatModal from './ChatModal';

const Detail = () => {
  const [isShowChat, setIsShowChat] = useState(false);

  const handleShowModal = () => {
    setIsShowChat(!isShowChat);
  };

  return (
    <Wrapper>
      디테일
      <ChatBtn onClick={handleShowModal}>채팅</ChatBtn>
      {/* 모달창 */}
      {isShowChat && <ChatModal />}
    </Wrapper>
  );
};

export default Detail;

// style
const Wrapper = styled.div`
  margin-top: 10vh;
`;

// 채팅
const ChatBtn = styled.button`
  width: 60px;
  aspect-ratio: 1/1;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.pointColorLight};
  color: ${({ theme }) => theme.pointColor};
  font-weight: 600;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
`;
