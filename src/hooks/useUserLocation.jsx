import { useCallback, useEffect, useState } from 'react';

const useUserLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const getUserLocation = useCallback(() => {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({ latitude, longitude });
    };

    const error = (error) => {
      console.error('사용자 위치를 가져오는데 실패했습니다:', error);
      setErrorMsg('위치정보를 가져오는데 실패했습니다. 위치권한을 확인하세요.');
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  return { location, errorMsg };
};

export default useUserLocation;
