import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ChatRoom = ({ client, selectedRoom }) => {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [messages, setMessages] = useState([
    { id: 1, text: '안녕하세요!', isMine: false },
    { id: 2, text: '안녕하세요! 반갑습니다.', isMine: true }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { id: Date.now(), text: input, isMine: true }]);
    setInput('');
  };

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

  // const sendMessage = () => {
  //   if (client && client.connected) {
  //     let destination;
  //     if (selectedRoom.type === 'direct') {
  //       destination = `/app/send/direct`;
  //     } else if (selectedRoom.type === 'group') {
  //       destination = `/app/send/group`;
  //     }

  //     client.publish({
  //       destination: destination,
  //       body: JSON.stringify({ roomId: selectedRoom.id, message: message })
  //     });
  //     setMessage('');
  //   }
  // };

  return (
    <ChatRoomContainer>
      <Header>채팅방</Header>
      <MessageList>
        {messages.map((message) => (
          <Message key={message.id} isMine={message.isMine}>
            <MessageBubble isMine={message.isMine}>
              {message.text}
            </MessageBubble>
          </Message>
        ))}
      </MessageList>
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
  height: 92vh;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ddd;
  background-color: #f7f7f7;
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
  ${({ isMine }) =>
    isMine ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 14px;
  line-height: 1.4;
  color: ${({ isMine }) => (isMine ? 'white' : 'black')};
  background-color: ${({ isMine }) => (isMine ? '#6f9fee' : '#e6e6e6')};
  ${({ isMine }) =>
    isMine ? 'border-top-right-radius: 0;' : 'border-top-left-radius: 0;'}
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
