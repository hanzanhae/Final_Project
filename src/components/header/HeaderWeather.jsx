import { CloudFilled, RetweetOutlined, SunFilled } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { airConditionData } from '../../api/api';

const HeaderWeather = ({ isDarkMode, loginPath, $color }) => {
  const dispatch = useDispatch();
  const [airState, setAirState] = useState('');

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      getAirData(latitude, longitude);
    };
    const error = (error) => {
      console.error('Error getting location:', error);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };

  const getAirData = async (lat, lon) => {
    const data = await airConditionData({ lat, lon });
    airCondition(data.pm2_5);
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

  const handleToggleWeather = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <WeatherCondition $color={$color}>
      <WeatherBox>
        <WeatherIcon>
          {isDarkMode ? <CloudFilled /> : <SunFilled />}
        </WeatherIcon>
        <WeatherText $isLogin={loginPath}>
          현재 대기질은 {airState},{' '}
          {isDarkMode ? '외출을 자제해 주세요' : '뛰기 좋은 날입니다'}
        </WeatherText>
      </WeatherBox>
      <ToggleBtn onClick={handleToggleWeather}>
        <RetweetOutlined />
      </ToggleBtn>
    </WeatherCondition>
  );
};

export default HeaderWeather;

// style
const WeatherCondition = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme, $color }) => $color || theme.textColor};
`;
const WeatherBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
const WeatherIcon = styled.div``;
const WeatherText = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
`;
const ToggleBtn = styled.div`
  cursor: pointer;
`;
