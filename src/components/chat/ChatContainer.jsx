import React, { useState, useEffect } from 'react';
import ChatLayout from './chatLayout/ChatLayout';
import ChatRoomListLayout from './chatLayout/ChatRoomListLayout';
import ChatRoom from './chatRoom/ChatRoom';

const ChatContainer = ({ selectedRoom }) => {
  const [currentRoom, setCurrentRoom] = useState({
    type: selectedRoom?.type || 'group',
    id: selectedRoom?.id || null,
    name: selectedRoom?.nickName || ''
  });
  useEffect(() => {
    if (selectedRoom) {
      setCurrentRoom({
        type: selectedRoom.type,
        id: selectedRoom.id,
        name: selectedRoom.nickName
      });
    } else {
      setCurrentRoom({
        type: 'group',
        id: null,
        name: ''
      });
    }
  }, [selectedRoom]);

  const handleRoomSelect = (roomType) => {
    setCurrentRoom({ type: roomType, id: null, nickName: '' });
  };

  const handleRoomClick = (room) => {
    setCurrentRoom({
      type: room.type,
      id: room.id,
      name: room.name
    });
  };

  const handleBackToRoomList = () => {
    setCurrentRoom((prev) => ({
      ...prev,
      id: null
    }));
  };

  return (
    <>
      {!currentRoom.id ? (
        <>
          <ChatRoomListLayout
            setSelectedRoom={handleRoomClick}
            selectedRoom={currentRoom}
            selectedRoomType={currentRoom.type}
            selectedRoomName={currentRoom.name}
          />
          <ChatLayout onRoomSelect={handleRoomSelect} />
        </>
      ) : (
        <>
          <ChatRoom
            selectedRoom={currentRoom}
            setSelectedRoom={handleBackToRoomList}
          />
          <ChatLayout onRoomSelect={handleRoomSelect} />
        </>
      )}
    </>
  );
};

export default ChatContainer;
