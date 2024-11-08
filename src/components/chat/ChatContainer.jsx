import React from 'react';
import ChatLayout from './chatLayout/ChatLayout';
import ChatRoomListLayout from './chatLayout/ChatRoomListLayout';
import ChatRoom from './chatRoom/ChatRoom';

const ChatContainer = ({ selectedRoom, setSelectedRoom }) => {
  return (
    <>
      <ChatRoomListLayout
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />
      <ChatLayout onRoomSelect={setSelectedRoom} />
      {/* {selectedRoom && <ChatRoom selectedRoom={selectedRoom} />} */}
    </>
  );
};

export default ChatContainer;
