import React, { useState, useEffect } from 'react';

const ChatRoom = ({ client, selectedRoom }) => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    if (!client || !selectedRoom) return;

    let subscribeDestination;

    if (selectedRoom.type === 'direct') {
      subscribeDestination = `/topic/direct/${selectedRoom.id}`; // 1:1 채팅방 구독
    } else if (selectedRoom.type === 'group') {
      subscribeDestination = `/topic/group/${selectedRoom.id}`; // 그룹 채팅방 구독
    }

    // WebSocket 구독
    const subscription = client.subscribe(subscribeDestination, (message) => {
      setReceivedMessages((prevMessages) => [
        ...prevMessages,
        JSON.parse(message.body)
      ]);
    });

    return () => {
      subscription.unsubscribe(); // 구독 해제
    };
  }, [client, selectedRoom]);

  const sendMessage = () => {
    if (client && client.connected) {
      let destination;
      if (selectedRoom.type === 'direct') {
        destination = `/app/send/direct`;
      } else if (selectedRoom.type === 'group') {
        destination = `/app/send/group`;
      }

      client.publish({
        destination: destination,
        body: JSON.stringify({ roomId: selectedRoom.id, message: message })
      });
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat Room: {selectedRoom.name}</h1>
      <ul>
        {receivedMessages.map((msg, index) => (
          <li key={index}>{msg.content}</li>
        ))}
      </ul>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
