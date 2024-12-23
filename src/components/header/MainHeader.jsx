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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 페이지별 헤더테마색상
  let headerBgColor;
  let headerTextColor;

  if (location.pathname === '/addMeet') {
    headerBgColor = isDarkMode
      ? darkTheme.bgColorBitDark
      : lightTheme.bgColorBitDark;
  } else if (location.pathname === '/' || location.pathname === '/login') {
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
    <Header $bgcolor={headerBgColor}>
      <HeaderInner>
        <HeaderLogo $color={headerTextColor} />
        <BtnBox>
          <HeaderWeather isDarkMode={isDarkMode} $color={headerTextColor} />
          <HeaderMenu $color={headerTextColor} />
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
  padding: 0 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1920px) {
    padding: 0 10rem;
  }
  @media (max-width: 1440px) {
    padding: 0 5rem;
  }
`;
const BtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
