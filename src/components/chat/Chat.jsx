import React, { useState } from 'react';
import ChatContainer from './ChatContainer';
import styled from 'styled-components';
import Run from '../../images/running.png';
import { CloseOutlined } from '@ant-design/icons';
const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <StyledCloseIcon onClick={toggleChat} />
      ) : (
        <ChatIcon $isOpen={isOpen} onClick={toggleChat} />
      )}
      <ChatBox $isOpen={isOpen}>
        {isOpen && (
          <>
            <ChatContainer />
          </>
        )}
      </ChatBox>
    </>
  );
};
export default Chat;

const StyledCloseIcon = styled(CloseOutlined)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  z-index: 1000000001;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ChatIcon = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  background: url(${Run});
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  border-radius: 50%;
  z-index: 1000;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const ChatBox = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  width: 400px;
  height: 50rem;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 100px;
  right: 3rem;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  z-index: 99999999999;
`;
