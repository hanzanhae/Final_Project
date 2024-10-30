import React from 'react';
import ChatLayout from './chatLayout/ChatLayout';
import ChatRoomListLayout from './chatLayout/ChatRoomListLayout';
import ChatRoom from './chatRoom/ChatRoom';

const ChatContainer = ({ client, selectedRoom, setSelectedRoom }) => {
  return (
    <>
      <ChatRoomListLayout setSelectedRoom={setSelectedRoom} />
      <ChatLayout onRoomSelect={setSelectedRoom} />
      {selectedRoom && <ChatRoom client={client} selectedRoom={selectedRoom} />}
    </>
  );
};

export default ChatContainer;
