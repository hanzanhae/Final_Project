import React, { useState } from 'react';
import ChatRoom from './chatRoom/ChatRoom';
import ChatRayout from './chatRayout/ChatRayout';

const ChatContainer = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room); // 선택된 방 정보 업데이트
  };

  return (
    <>
      <ChatRoom selectedRoom={selectedRoom} />
      <ChatRayout onRoomSelect={handleRoomSelect} />
    </>
  );
};

export default ChatContainer;
