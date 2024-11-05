import React, { useEffect } from 'react';
import { UniBtn } from '../../button/UniBtn';

const FilterMyLocation = () => {
  const getUserLocation = () => {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // console.log('위치정보: ', latitude, longitude);
    };
    const error = (error) => {
      console.error('사용자 위치를 가져오는데 실패했습니다.:', error);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <UniBtn
      $bordorradius="2rem"
      $padding="0.4rem 1rem"
      // onClick={getUserLocation}
    >
      내주변모임
    </UniBtn>
  );
};

export default FilterMyLocation;
