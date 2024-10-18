import React from 'react';
import styled from 'styled-components';

const ChatModal = () => {
  return (
    <ModalBox>
      <ChatList />
      <ChatList />
      <ChatList />
    </ModalBox>
  );
};

export default ChatModal;

// style
const ModalBox = styled.div`
  width: 30%;
  height: 70vh;
  padding: 1rem;
  background-color: ${({ theme }) => theme.pointColorLight};
  border-radius: 1rem;
  position: fixed;
  right: 5rem;
  bottom: 5rem;
  z-index: 999;
`;
const ChatList = styled.div`
  width: 100%;
  height: 60px;
  margin-bottom: 0.5rem;
  background-color: #fff;
  border-radius: 0.5rem;
`;
