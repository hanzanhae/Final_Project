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
      localStorage.removeItem('loginType');
      navigate('/login');
    } else {
      console.error('로그아웃에 실패했습니다.');
    }
  };
  const handleKakaoLogout = () => {
    if (window.Kakao && window.Kakao.isInitialized() && window.Kakao.Auth) {
      window.Kakao.Auth.logout(() => {
        console.log('카카오 로그아웃 성공');
        localStorage.removeItem('loginType');
        navigate('/login');
      });
    } else {
      console.error('카카오 SDK가 로드되지 않았습니다.');
    }
  };
  const handleLogout = () => {
    const loginType = localStorage.getItem('loginType'); // 로그인 타입 확인
    if (loginType === 'kakao') {
      handleKakaoLogout();
    } else {
      handleLocalLogout();
    }
  };

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
