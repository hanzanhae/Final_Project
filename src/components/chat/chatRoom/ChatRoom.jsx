import React from 'react';
import * as S from '../../../styles/chatStyle/ChatRoomStyle';
const ChatRoom = ({ selectedRoom }) => {
  return (
    <S.ChatRoomContainer>
      {selectedRoom === 'Profile' && <div>프로필 방 내용</div>}
      {selectedRoom === 'Room' && <div>단체 채팅방 내용</div>}
      {selectedRoom === 'DieDie' && <div>1:1 채팅방 내용</div>}
    </S.ChatRoomContainer>
  );
};

export default ChatRoom;
