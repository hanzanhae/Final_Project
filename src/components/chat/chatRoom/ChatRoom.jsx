import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { getChattingLog } from '../../../api/api';
import { useDispatch } from 'react-redux';
import { addUnreadMessage } from '../../../redux/reducers/unreadMessagesReducer';

const ChatRoom = ({ selectedRoom, setSelectedRoom }) => {
  const userId = localStorage.getItem('userNickName');
  const [pageNum, setPageNum] = useState(0);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const messageListRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChatLogs = async () => {
      try {
        const response = await getChattingLog(
          selectedRoom.type,
          selectedRoom.id,
          pageNum
        );
        if (response && response.messages) {
          const newMessages = response.messages.content.map((msg) => ({
            id: msg.timestamp,
            text: msg.content,
            isMine: msg.senderName === userId
          }));
          addUniqueMessages(newMessages);
          if (response.messages.last) setHasMoreMessages(false);
          else setPageNum((prevPage) => prevPage + 1);
        }
      } catch (error) {
        console.error('Failed to load chat logs:', error);
      }
    };

    if (hasMoreMessages) fetchChatLogs();
  }, [pageNum, selectedRoom.type, selectedRoom.id]);

  const addUniqueMessages = (newMessages) => {
    setMessages((prevMessages) => {
      const uniqueIds = new Set(prevMessages.map((msg) => msg.id));
      return [
        ...prevMessages,
        ...newMessages.filter((msg) => !uniqueIds.has(msg.id))
      ];
    });
  };
  let retryCount = 0;
  const MAX_RETRIES = 5;

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const socket = new SockJS('https://myspringserver.store/ws');
    const stomp = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 10000,
      debug: (str) => console.log('STOMP Debug:', str),
      onConnect: () => {
        retryCount = 0;
        setIsConnected(true);
        const topicPath = `/topic/${selectedRoom.type}/${selectedRoom.id}`;
        stomp.subscribe(topicPath, (message) => {
          const receivedMessage = JSON.parse(message.body);
          const isMine = receivedMessage.senderName === userId;
          addUniqueMessages([
            { id: Date.now(), text: receivedMessage.content, isMine }
          ]);
          if (!isMine) dispatch(addUnreadMessage());
        });
      },
      onDisconnect: () => {
        if (retryCount < MAX_RETRIES) {
          retryCount++;
        } else {
          stomp.deactivate();
          console.error('연결 실패: 재시도 횟수 초과');
        }
        setIsConnected(false);
        console.log('Disconnected from WebSocket');
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      }
    });

    stomp.activate();
    setStompClient(stomp);

    return () => {
      stomp.deactivate();
      setStompClient(null);
    };
  }, [selectedRoom.type, selectedRoom.id, userId]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (stompClient && stompClient.connected && input.trim()) {
      stompClient.publish({
        destination: `/app/send/${selectedRoom.type}`,
        body: JSON.stringify({
          roomId: selectedRoom.id,
          content: input,
          senderName: userId
        })
      });
      setInput('');
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    date.setHours(date.getHours() + 9);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const shouldDisplayTime = (currentMessage, index) => {
    if (index === 0) return true;
    const previousMessage = messages[index - 1];
    const currentSeconds = new Date(currentMessage.timestamp).getSeconds();
    const previousSeconds = new Date(previousMessage.timestamp).getSeconds();
    return currentSeconds !== previousSeconds;
  };

  return (
    <ChatRoomContainer>
      <HeaderContainer>
        <CustomArrow
          onClick={() => setSelectedRoom((prev) => ({ ...prev, id: null }))}
        />
        <Header>채팅방: {selectedRoom.name}</Header>
      </HeaderContainer>
      {isConnected ? (
        <MessageList ref={messageListRef}>
          {messages.map((message, index) => (
            <Message key={message.id} $isMine={message.isMine}>
              <MessageBubble $isMine={message.isMine}>
                {message.text}
              </MessageBubble>
              {shouldDisplayTime(message, index) && (
                <MessageTimeStamp>{formatTime(message.id)}</MessageTimeStamp>
              )}
            </Message>
          ))}
        </MessageList>
      ) : (
        <div>연결 중...</div>
      )}
      <InputContainer>
        <Input
          type="text"
          placeholder="메시지를 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <SendButton onClick={sendMessage}>전송</SendButton>
      </InputContainer>
    </ChatRoomContainer>
  );
};

export default ChatRoom;

const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 85%;
  max-width: 600px;
  margin: 0 auto;
  border: 2px solid #6f9fee;
  border-bottom: 0;
  background-color: #f7f7f7;
`;
const CustomArrow = styled(DoubleLeftOutlined)`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translate(0%, -50%);
  width: 2rem;
  height: 2rem;
`;
const HeaderContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;
const Header = styled.div`
  background-color: #f7f7f7;
  border-bottom: 1px solid #ddd;
  padding: 15px;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;
const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 15px;
`;
const Message = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: flex-end;
  ${({ $isMine }) =>
    $isMine ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}
`;
const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 14px;
  line-height: 1.4;
  color: ${({ $isMine }) => ($isMine ? 'white' : 'black')};
  background-color: ${({ $isMine }) => ($isMine ? '#6f9fee' : '#e6e6e6')};
  ${({ $isMine }) =>
    $isMine ? 'border-top-right-radius: 0;' : 'border-top-left-radius: 0;'}
`;
const MessageTimeStamp = styled.div`
  font-size: 8px;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: white;
`;
const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  margin-right: 10px;
`;
const SendButton = styled.button`
  padding: 10px 15px;
  background-color: #6f9fee;
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #5a7bcb;
  }
`;
