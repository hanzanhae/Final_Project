import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import SunIcon from '../icons/sun.svg';
import MaskIcon from '../icons/mask.svg';
import UserIcon from '../icons/UserIcon';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../theme';

const MainHeader = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleToggleWeather = () => {
    dispatch({ type: 'WEATHER_THEME' });
  };

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

  // 헤더배경색
  let headerBgColor;

  if (location.pathname === '/') {
    if (isScrolled) {
      headerBgColor = isDarkMode ? darkTheme.bgColorDark : lightTheme.bgColorDark;
    } else {
      headerBgColor = isDarkMode ? darkTheme.bgColor : lightTheme.bgColor;
    }
  } else {
    headerBgColor = isDarkMode ? darkTheme.bgColorDark : lightTheme.bgColorDark;
  }

  return (
    <Header $bgcolor={headerBgColor}>
      <HeaderInner>
        <Link to="/">
          <Logo>RUNTO</Logo>
        </Link>
        <BtnBox>
          <WeatherBtn onClick={handleToggleWeather}>
            {!isDarkMode ? (
              <BtnInner>
                <WeatherIcon src={SunIcon} />
                <WeatherText>미세먼지농도 좋음</WeatherText>
              </BtnInner>
            ) : (
              <BtnInner>
                <WeatherIcon src={MaskIcon} />
                <WeatherText>미세먼지농도 나쁨</WeatherText>
              </BtnInner>
            )}
          </WeatherBtn>
          <Link to="/login">
            <LoginBtn>로그인</LoginBtn>
          </Link>
          <Link to="/user">
            <UserBtn>
              <UserIcon />
            </UserBtn>
          </Link>
        </BtnBox>
      </HeaderInner>
    </Header>
  );
};

export default MainHeader;

// style
const Header = styled.header`
  width: 100%;
  height: 8vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: ${({ $bgcolor }) => $bgcolor};
  box-shadow: 0 0 20px 1px #333333;
`;
const HeaderInner = styled.div`
  height: 100%;
  padding: 0 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.h1`
  color: ${({ theme }) => theme.textColor};
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const WeatherBtn = styled.button`
  width: 180px;
  height: 30px;
  margin-right: 2rem;
  background-color: ${({ theme }) => theme.pointColorLight};
  border-radius: 1rem;
`;
const BtnInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
const WeatherIcon = styled.img`
  width: 1.5rem;
`;
const WeatherText = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
`;

const LoginBtn = styled.button`
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
`;
const UserBtn = styled.button``;
