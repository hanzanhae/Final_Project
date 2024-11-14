import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout, kakaoLogout } from '../../api/api';
import { BellOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { resetUnreadMessages } from '../../redux/reducers/unreadMessagesReducer';

const HeaderMenu = ({ loginPath, $color }) => {
  const unreadCount = useSelector((state) => state.unreadMessages);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLocalLogout = async () => {
    const response = await logout();
    if (response) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('loginType');
      localStorage.removeItem('userNickName');
      navigate('/login');
    } else {
      console.error('로그아웃에 실패했습니다.');
    }
  };
  const handleKakaoLogout = async () => {
    try {
      const response = await kakaoLogout();
      if (response) {
        console.log('카카오 로그아웃 성공');
        localStorage.removeItem('loginType');
        localStorage.removeItem('userNickName');
        localStorage.removeItem('KaKaoAccessToken');
        navigate('/login');
      }
    } catch (error) {
      console.error('카카오 로그아웃에 실패했습니다.', error);
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
  const handleNotificationClick = () => {
    dispatch(resetUnreadMessages());
  };

  return (
    <MenuWrapper>
      {localStorage.getItem('loginType') === 'local' ? (
        <MenuBtn $isLogin={loginPath} $color={$color}>
          {localStorage.getItem('userNickName')} 님
        </MenuBtn>
      ) : localStorage.getItem('loginType') === 'kakao' ? (
        <MenuBtn>{localStorage.getItem('userNickName')} 님</MenuBtn>
      ) : (
        <Link to="/login">
          <MenuBtn $isLogin={loginPath} $color={$color}>
            login
          </MenuBtn>
        </Link>
      )}
      <MenuBtn onClick={handleNotificationClick}>
        <StyleBellOutlined />
        {unreadCount > 0 && <Notification>{unreadCount}</Notification>}
      </MenuBtn>
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
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
  position: relative;
  @media (max-width: 1440px) {
    font-size: 0.8rem;
  }
`;

const StyleBellOutlined = styled(BellOutlined)``;

const Notification = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
`;
