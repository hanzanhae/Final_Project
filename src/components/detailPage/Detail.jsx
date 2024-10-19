import React, { useEffect, useState } from 'react';
import ChatModal from './ChatModal';
import { useParams } from 'react-router-dom';

import DetailInfo from './DetailInfo';
import DetailMember from './DetailMember';

import { ChatBtn, Wrapper } from '../../styles/detailPage/DetailStyle';
import { meetingList } from '../../meetingList';

const Detail = () => {
  const { id } = useParams();
  const [isShowChat, setIsShowChat] = useState(false);

  const meet = meetingList.find((m) => m.id === parseInt(id));

  const handleShowModal = () => {
    setIsShowChat(!isShowChat);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      디테일-{id}
      <DetailInfo meet={meet} />
      <DetailMember meet={meet} />
      {/* 채팅버튼 */}
      <ChatBtn onClick={handleShowModal}>채팅</ChatBtn>
      {/* 모달창 */}
      {isShowChat && <ChatModal />}
    </Wrapper>
  );
};

export default Detail;
