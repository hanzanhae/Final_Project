import React, { useState } from 'react';
import ReportModal from './ReportModal';
import styled from 'styled-components';

const MemberMenu = ({ setActiveMember }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <MenuBox onClick={(e) => e.stopPropagation()}>
        <MenuUl>
          <MenuLi>채팅하기</MenuLi>
          <MenuLi onClick={handleShowModal}>신고하기</MenuLi>
        </MenuUl>
      </MenuBox>
      {showModal && (
        <ReportModal
          setShowModal={setShowModal}
          setActiveMember={setActiveMember}
        />
      )}
    </>
  );
};

export default MemberMenu;

// style
const MenuBox = styled.div`
  width: 100px;
  height: fit-content;
  background-color: #fff;
  border: 1px solid #ececec;
  border-radius: 0.25rem;
  position: absolute;
  z-index: 99;
  top: 2.3rem;
  left: 2.3rem;
`;
const MenuUl = styled.ul`
  width: 100%;
`;
const MenuLi = styled.li`
  width: 100%;
  height: 40px;
  font-size: 0.8rem;
  line-height: 40px;
  &:hover {
    color: tomato;
  }
`;
