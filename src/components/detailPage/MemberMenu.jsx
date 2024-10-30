import React, { useState } from 'react';
import { MenuBox, MenuLi, MenuUl } from '../../styles/detailPage/DetailStyle';
import ReportModal from './ReportModal';

const MemberMenu = ({ setActiveMember }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };
  // const stopEventHandler = (e) => {
  //   e.stopPropagation();
  // };

  return (
    <>
      <MenuBox
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <MenuUl>
          <MenuLi>채팅하기</MenuLi>
          <MenuLi onClick={handleShowModal}>신고하기</MenuLi>
        </MenuUl>
      </MenuBox>
      {showModal && <ReportModal setShowModal={setShowModal} setActiveMember={setActiveMember} />}
    </>
  );
};

export default MemberMenu;
