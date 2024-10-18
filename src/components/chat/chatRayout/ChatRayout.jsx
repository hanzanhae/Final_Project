import React, { useEffect, useState } from 'react';
import * as S from '../../../styles/chatStyle/ChatRoomStyle';

const ChatRayout = ({ onRoomSelect }) => {
  const [ws, setWs] = useState(null); // WebSocket 연결

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4000/chat');
    setWs(socket);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('서버로부터 받은 메시지:', message);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleRoomClick = (roomType) => {
    onRoomSelect(roomType);
    if (ws && ws.readyState === WebSocket.OPEN) {
      // WebSocket이 열려 있는 경우 서버로 메시지 전송
      ws.send(JSON.stringify({ type: 'JOIN_ROOM', room: roomType }));
    }
  };

  return (
    <S.ChatRayoutContainer>
      <S.Profile onClick={() => handleRoomClick('Profile')}></S.Profile>
      <S.Room onClick={() => handleRoomClick('Room')}></S.Room>
      <S.DieDie onClick={() => handleRoomClick('DieDie')}></S.DieDie>
    </S.ChatRayoutContainer>
  );
};

export default ChatRayout;
