import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderMenu = ({ handleLogout, loginPath, $color }) => {
  return (
    <MenuWrapper>
      <Link to="/login">
        <LoginBtn $isLogin={loginPath} $color={$color}>
          login
        </LoginBtn>
      </Link>
      <Link to="/mypage">
        <UserBtn $isLogin={loginPath} $color={$color}>
          mypage
        </UserBtn>
      </Link>
      <button onClick={handleLogout}>로그아웃</button>
    </MenuWrapper>
  );
};

export default HeaderMenu;

// style
const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
const LoginBtn = styled.button`
  color: ${({ theme, $color }) => $color || theme.textColor};
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;
const UserBtn = styled.button`
  color: ${({ theme, $color }) => $color || theme.textColor};
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;
