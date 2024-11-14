import React, { useEffect, useState } from 'react';
import Detail from '../components/detailPage/Detail';
import Chat from '../components/chat/Chat';

const DetailMeeting = () => {
  const [whatIsSelectedRoom, setWhatIsSelectedRoom] = useState({
    type: 'group',
    id: null
  });
  const [isOpen, setIsOpen] = useState(false);

  const openDirectChat = (roomId, nickName) => {
    console.log('Room ID:', roomId, 'Nickname:', nickName);
    setWhatIsSelectedRoom({ type: 'direct', id: roomId, nickName });
    setIsOpen(true);
  };

  return (
    <>
      <Detail openDirectChat={openDirectChat} />
      <Chat
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        whatIsSelectedRoom={whatIsSelectedRoom}
        setWhatIsSelectedRoom={setWhatIsSelectedRoom}
      />
    </>
  );
};

export default DetailMeeting;
