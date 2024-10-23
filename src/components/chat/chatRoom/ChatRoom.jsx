import React, { useEffect, useState } from 'react';
import * as S from '../../../styles/chatStyle/ChatRoomStyle';
import socket from '../../../server';
const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  useEffect(() => {
    socket.on('message', (messageData) => {
      console.log('서버로부터 받은 메시지:', messageData);
      setChatLog((prevLog) => [...prevLog, messageData]); // 채팅 로그 업데이트
    });

    return () => {
      socket.off('message');
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('message', { content: message });
      setMessage('');
    }
  };
  return (
    <S.ChatRoomContainer>
      <div>
        <ul>
          {/* 채팅 로그 표시 */}
          {chatLog.map((msg, index) => (
            <li key={index}>{msg.content}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </S.ChatRoomContainer>
  );
};

export default ChatRoom;
