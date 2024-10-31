import React from 'react';
import * as S from '../../../styles/chatStyle/ChatRoomStyle';

const ChatLayout = ({ onRoomSelect }) => {
  const handleRoomClick = (roomType) => {
    onRoomSelect(roomType);
  };

  return (
    <S.ChatLayoutContainer>
      <S.Profile onClick={() => handleRoomClick('profile')} />
      <S.Room onClick={() => handleRoomClick('group')} />
      <S.DieDie onClick={() => handleRoomClick('direct')} />
    </S.ChatLayoutContainer>
  );
};

export default ChatLayout;
