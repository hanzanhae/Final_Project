import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../theme';

import SunIcon from '../icons/sun.svg';
import MaskIcon from '../icons/mask.svg';

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
} from '../styles/mainPage/HeaderStyle';
import axios from 'axios';

const API_KEY = '947586767a6ce78304ecfd287c3de3ed';

const MainHeader = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [isScrolled, setIsScrolled] = useState(false);
  // 미세먼지 상태관리
  // const [airPollution, setAirPollution] = useState({});
  const [showText, setShowText] = useState('');

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
      // setAirPollution(air);
      airCondition(air.pm2_5);
    } catch (e) {
      console.log(e.message);
    }
  };

  // 대기질 표시
  const airCondition = (pm2_5) => {
    if (pm2_5 === undefined) {
      setShowText('데이터 없음');
    } else if (pm2_5 <= 15) {
      setShowText('좋음');
    } else if (pm2_5 <= 25) {
      setShowText('보통');
    } else if (pm2_5 <= 50) {
      setShowText('나쁨');
    } else {
      setShowText('매우나쁨');
    }
  };

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
    getUserLocation();
    airCondition();

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
                <WeatherText>현재 대기질은 {showText}, 뛰기 좋은 날입니다</WeatherText>
              </BtnInner>
            ) : (
              <BtnInner>
                <WeatherIcon src={MaskIcon} />
                <WeatherText>현재 대기질은 {showText}, 외출을 자제해 주세요</WeatherText>
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
