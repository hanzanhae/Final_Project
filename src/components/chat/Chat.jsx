import React, { useState, useEffect } from 'react';
import * as S from '../../styles/chatStyle/ChatStyle';
import ChatContainer from './ChatContainer';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const socket = new SockJS('https://myspringserver.store/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log('STOMP Debug: ', str),
      onConnect: () => {
        console.log('Connected to WebSocket server');
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      }
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <S.ChatIcon $isOpen={isOpen} onClick={toggleChat} />
      <S.ChatBox $isOpen={isOpen}>
        {isOpen && client && (
          <ChatContainer
            client={client}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />
        )}
      </S.ChatBox>
    </>
  );
};
export default Chat;
