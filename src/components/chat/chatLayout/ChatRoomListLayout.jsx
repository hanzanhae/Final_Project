import React, { useState, useEffect, useRef } from 'react';
import { getChatRoomList } from '../../../api/api';
import styled from 'styled-components';

const ChatRoomListLayout = ({
  selectedRoom,
  selectedRoomType,
  setSelectedRoom
}) => {
  const [roomList, setRoomList] = useState([]);
  const [pageNum, setPageNum] = useState(0); // 현재 페이지 번호

  useEffect(() => {
    console.log(selectedRoom.type);
    const fetchRoomList = async () => {
      try {
        const data = await getChatRoomList(selectedRoom.type, pageNum);
        console.log(data.content);
        if (data.content.length === 0) {
          setRoomList(data.content);
        } else {
          setRoomList((prevRoomList) => [...prevRoomList, ...data.content]);
        }
        if (data.content.length >= 7) {
          setPageNum((prevPageNum) => prevPageNum + 1);
        }
      } catch (error) {
        console.error('Failed to fetch chat rooms:', error);
      }
    };

    if (selectedRoom.type) {
      fetchRoomList();
    }
  }, [pageNum, selectedRoom.type]);

  const handleRoomClick = (room) => {
    setSelectedRoom({
      type: selectedRoom.type,
      id: room.roomId,
      name: room.name
    });
  };

  return (
    <ChatRoomListContainer>
      <ChatRoomUl>
        {roomList?.map((room) => (
          <li key={room.id}>
            <ChatRoomListsBox onClick={() => handleRoomClick(room)}>
              <ChatRoomListsImg src={room.profileImage} />
              <ChatRoomListTitle>{room.name}</ChatRoomListTitle>
            </ChatRoomListsBox>
          </li>
        ))}
      </ChatRoomUl>
    </ChatRoomListContainer>
  );
};

export default ChatRoomListLayout;

const ChatRoomListContainer = styled.div`
  height: 85%;
  overflow-y: auto;
  max-height: 85%;
  border: 2px solid #6f9fee;
  border-bottom: 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatRoomListsBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1vw;
`;
const ChatRoomListsImg = styled.img`
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  background-color: gray;
`;

const ChatRoomListTitle = styled.div`
  font-size: 1vw;
  font-weight: 700;
`;
const ChatRoomUl = styled.ul`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2vw;
`;
