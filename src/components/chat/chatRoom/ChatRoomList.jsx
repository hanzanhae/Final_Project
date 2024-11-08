import React from 'react';
import * as S from '../../../styles/chatStyle/ChatRoomStyle';
import ChatRoom from './ChatRoom';

const ChatRoomList = ({ selectedRoom }) => {
  return (
    <S.ChatRoomContainer>
      {selectedRoom === 'Profile' && <ChatRoom />}
      {selectedRoom === 'group' && <ChatRoom />}
      {selectedRoom === 'direct' && <ChatRoom />}
    </S.ChatRoomContainer>
  );
};

export default ChatRoomList;
