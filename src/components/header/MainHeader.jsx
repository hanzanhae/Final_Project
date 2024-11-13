import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../styles/theme';
import { logout } from '../../redux/actions/userActions';
import styled from 'styled-components';
import HeaderLogo from './HeaderLogo';
import HeaderWeather from './HeaderWeather';
import HeaderMenu from './HeaderMenu';

const MainHeader = () => {
  const location = useLocation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    if (!location.pathname.startsWith('/admin')) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location]);

  // 페이지별 헤더테마색상
  let loginPath = location.pathname === '/login';
  let headerBgColor;
  let headerTextColor;

  if (loginPath) {
    // headerBgColor = darkTheme.bgColor;
    // headerTextColor = darkTheme.textColor;
  } else if (location.pathname === '/') {
    if (isScrolled) {
      headerBgColor = isDarkMode
        ? darkTheme.bgColorDark
        : lightTheme.bgColorDark;
    } else {
      headerBgColor = isDarkMode ? darkTheme.bgColor : lightTheme.bgColor;
    }
  } else {
    headerBgColor = isDarkMode ? darkTheme.bgColorDark : lightTheme.bgColorDark;
  }

  return (
    <Header
      $bgcolor={headerBgColor}
      $isFixed={location.pathname.startsWith('/admin')}
    >
      <HeaderInner>
        <HeaderLogo loginPath={loginPath} $color={headerTextColor} />
        <BtnBox>
          <HeaderWeather
            isDarkMode={isDarkMode}
            loginPath={loginPath}
            $color={headerTextColor}
          />
          <HeaderMenu loginPath={loginPath} $color={headerTextColor} />
        </BtnBox>
      </HeaderInner>
    </Header>
  );
};

export default MainHeader;

const Header = styled.header`
  width: 100%;
  height: 8vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: ${({ $bgcolor }) => $bgcolor};
  color: ${({ $color }) => $color};
  box-shadow: 0 0 10px 1px #00000050;
`;
const HeaderInner = styled.div`
  height: 100%;
  padding: 0 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
