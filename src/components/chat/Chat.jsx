import React, { useState } from 'react';
import * as S from '../../styles/chatStyle/ChatStyle';
import ChatContainer from './ChatContainer';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <>
      <S.ChatIcon $isOpen={isOpen} onClick={toggleChat} />
      <S.ChatBox $isOpen={isOpen}>
        <ChatContainer />
      </S.ChatBox>
    </>
  );
};
export default Chat;
