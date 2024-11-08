import React, { useState, useEffect } from 'react';
import { getChatRoomList } from '../../../api/api';
import styled from 'styled-components';

const ChatRoomListLayout = ({ selectedRoom, setSelectedRoom }) => {
  //여기 axios get을 통한 챗룸리스트 보여주는 레이아웃
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    const fetchRoomList = async () => {
      try {
        const data = await getChatRoomList(selectedRoom);
        console.log(data);
        setRoomList(data.list);
      } catch (error) {
        console.error('Failed to fetch chat rooms:', error);
      }
    };

    if (selectedRoom) {
      fetchRoomList();
    }
  }, [selectedRoom]);
  //의존성 배열에 빈배열을 해야할까 selectedRoom 을 넣어야할까 고민

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  return (
    <ChatRoomListContainer>
      <ul>
        {roomList.map((room) => (
          <li key={room.id}>{room}</li>
        ))}
      </ul>
    </ChatRoomListContainer>
  );
};

export default ChatRoomListLayout;

const ChatRoomListContainer = styled.div`
  height: 85%;
`;
