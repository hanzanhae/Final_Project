import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../styles/theme';
import { logout } from '../redux/actions/userActions';
import axios from 'axios';

// icon
import SunIcon from '../icons/sun.svg';
import MaskIcon from '../icons/mask.svg';
import { ThemeIcon } from '../icons/ThemeIcon';

// style
import {
  BtnBox,
  Header,
  HeaderInner,
  LoginBtn,
  Logo,
  ThemeBtn,
  UserBtn,
  WeatherBox,
  WeatherCondition,
  WeatherIcon,
  WeatherText
} from '../styles/mainPage/HeaderStyle';

const API_KEY = '947586767a6ce78304ecfd287c3de3ed';

const MainHeader = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [isScrolled, setIsScrolled] = useState(false);
  const [airState, setAirState] = useState('');

  // 현재위치데이터
  const getUserLocation = () => {
    const success = (position) => {
      // console.log("위치정보: ", position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      getAirData(latitude, longitude);
    };
    const error = (error) => {
      console.error('Error getting location:', error);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };

  // 미세먼지농도 데이터
  const getAirData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
      );
      // console.log(response.data.list[0].components); // pm10, pm2_5
      const air = response.data.list[0].components;
      airCondition(air.pm2_5);
      // airCondition(50);
    } catch (e) {
      console.log(e.message);
    }
  };

  // 대기질 표시
  const airCondition = (pm2_5) => {
    let newTheme;
    if (pm2_5 <= 15) {
      setAirState('좋음');
      newTheme = 'light';
    } else if (pm2_5 <= 25) {
      setAirState('보통');
      newTheme = 'light';
    } else if (pm2_5 <= 50) {
      setAirState('나쁨');
      newTheme = 'dark';
    } else {
      setAirState('매우나쁨');
      newTheme = 'dark';
    }

    dispatch({ type: 'SET_THEME', payload: newTheme });
  };
  // 버튼으로 테마변경
  const handleToggleWeather = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    getUserLocation();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 페이지별 헤더테마색상
  let loginPath = location.pathname === '/login';
  let headerBgColor;
  if (location.pathname === '/') {
    if (isScrolled) {
      headerBgColor = isDarkMode
        ? darkTheme.bgColorDark
        : lightTheme.bgColorDark;
    } else {
      headerBgColor = isDarkMode ? darkTheme.bgColor : lightTheme.bgColor;
    }
  } else if (location.pathname === '/login') {
    headerBgColor = darkTheme.bgColor;
  } else {
    headerBgColor = isDarkMode ? darkTheme.bgColorDark : lightTheme.bgColorDark;
  }

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Header $bgcolor={headerBgColor}>
      <HeaderInner>
        <Link to="/">
          <Logo $isLogin={loginPath}>RUNTO</Logo>
        </Link>
        <BtnBox>
          <WeatherCondition>
            <WeatherBox>
              <WeatherIcon src={isDarkMode ? MaskIcon : SunIcon} />
              <WeatherText $isLogin={loginPath}>
                현재 대기질은 {airState},{' '}
                {isDarkMode ? '외출을 자제해 주세요' : '뛰기 좋은 날입니다'}
              </WeatherText>
            </WeatherBox>
            <ThemeBtn onClick={handleToggleWeather}>
              <ThemeIcon />
            </ThemeBtn>
          </WeatherCondition>
          <Link to="/login">
            <LoginBtn $isLogin={loginPath}>login</LoginBtn>
          </Link>
          <Link to="/mypage">
            <UserBtn $isLogin={loginPath}>mypage</UserBtn>
          </Link>
          <button onClick={handleLogout}>로그아웃</button>
        </BtnBox>
      </HeaderInner>
    </Header>
  );
};

export default MainHeader;
