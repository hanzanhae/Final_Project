import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderMenu = ({ handleLogout, loginPath }) => {
  return (
    <>
      <Link to="/login">
        <LoginBtn $isLogin={loginPath}>login</LoginBtn>
      </Link>
      <Link to="/user">
        <UserBtn $isLogin={loginPath}>mypage</UserBtn>
      </Link>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
};

export default HeaderMenu;

// style

const LoginBtn = styled.button`
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;
const UserBtn = styled.button`
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
  text-transform: uppercase;

  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;
