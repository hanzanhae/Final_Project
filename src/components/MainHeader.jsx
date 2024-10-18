import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../theme';

import SunIcon from '../icons/sun.svg';
import MaskIcon from '../icons/mask.svg';
// import UserIcon from '../icons/UserIcon';
// import LoginIcon from '../icons/LoginIcon';

import {
  BtnBox,
  BtnInner,
  Header,
  HeaderInner,
  LoginBtn,
  Logo,
  UserBtn,
  WeatherBtn,
  WeatherIcon,
  WeatherText
} from '../styles/main-page/HeaderStyle';

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
            <LoginBtn>login</LoginBtn>
          </Link>
          <Link to="/user">
            <UserBtn>mypage</UserBtn>
          </Link>
        </BtnBox>
      </HeaderInner>
    </Header>
  );
};

export default MainHeader;
