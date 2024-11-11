import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../api/api';

const HeaderMenu = ({ loginPath, $color }) => {
  const navigate = useNavigate();

  const handleLocalLogout = async () => {
    const response = await logout();
    if (response) {
      localStorage.removeItem('accessToken');
      navigate('/');
    } else {
      console.error('로그아웃에 실패했습니다.');
    }
  };
  const handleKakaoLogout = () => {
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.logout(() => {
        console.log('카카오 로그아웃 성공');
        navigate('/');
      });
    } else {
      console.error('카카오 SDK가 로드되지 않았습니다.');
    }
  };
  const handleLogout = () => {
    handleKakaoLogout();
    handleLocalLogout();
  };

  return (
    <MenuWrapper>
      <Link to="/login">
        <MenuBtn $isLogin={loginPath} $color={$color}>
          login
        </MenuBtn>
      </Link>
      <MenuBtn $color={$color} onClick={handleLogout}>
        Logout
      </MenuBtn>
      <Link to="/mypage">
        <MenuBtn $isLogin={loginPath} $color={$color}>
          mypage
        </MenuBtn>
      </Link>
    </MenuWrapper>
  );
};

export default HeaderMenu;

// style
const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0;
`;
const MenuBtn = styled.button`
  color: ${({ theme, $color }) => $color || theme.textColor};
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;
