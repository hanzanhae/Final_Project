import React from 'react';
import { MenuBox, MenuLi, MenuUl } from '../../styles/detail-page/DetailStyle';

const MemberMenu = () => {
  return (
    <MenuBox>
      <MenuUl>
        <MenuLi>채팅하기</MenuLi>
        <MenuLi>신고하기</MenuLi>
      </MenuUl>
    </MenuBox>
  );
};

export default MemberMenu;
