import React, { useState } from 'react';
import ChatLayout from './chatLayout/ChatLayout';
import ChatRoomListLayout from './chatLayout/ChatRoomListLayout';
import ChatRoom from './chatRoom/ChatRoom';

const ChatContainer = () => {
  const [selectedRoom, setSelectedRoom] = useState({ type: null, room: null });
  const handleRoomSelect = (roomType) => {
    setSelectedRoom({ type: roomType, room: null });
  };

  const handleRoomClick = (room) => {
    setSelectedRoom((prev) => ({ ...prev, room }));
  };

  const handleBackToRoomList = () => {
    setSelectedRoom({ type: selectedRoom.type, room: null });
  };

  return (
    <>
      {!selectedRoom.room ? (
        <>
          <ChatRoomListLayout
            setSelectedRoom={handleRoomClick}
            selectedRoomType={selectedRoom.type}
          />
          <ChatLayout onRoomSelect={handleRoomSelect} />
        </>
      ) : (
        <>
          <ChatRoom
            selectedRoom={selectedRoom.room}
            roomType={selectedRoom.type}
            roomId={selectedRoom}
            setSelectedRoom={handleBackToRoomList}
          />
          <ChatLayout onRoomSelect={handleRoomSelect} />
        </>
      )}
    </>
  );
};

export default ChatContainer;
