import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const apiKey = process.env.REACT_APP_DETAIL_KAKAO_API_KEY;
const KakaoUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;

const KakaoLocation = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');

  // 현재위치데이터
  const getUserLocation = () => {
    const success = async (position) => {
      // console.log('위치정보: ', position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const userPosition = new window.kakao.maps.LatLng(latitude, longitude);

      mapRef.current.setCenter(userPosition);

      const marker = new window.kakao.maps.Marker({
        position: userPosition
      });
      marker.setMap(mapRef.current);
    };

    const error = (error) => {
      console.error('사용자 위치를 가져오는데 실패했습니다:', error);
      setErrorMsg('위치정보를 가져오는데 실패했습니다. 위치권한을 확인하세요.');
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };

  // 카카오맵 연결
  const loadKakaoMap = () => {
    const script = document.createElement('script');
    script.src = KakaoUrl;
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
        };
        mapRef.current = new window.kakao.maps.Map(
          mapContainerRef.current,
          mapOption
        );

        getUserLocation();
      } else {
        console.error('Kakao Maps API 로드에 실패했습니다:');
      }
    };
    document.head.appendChild(script);
  };

  useEffect(() => {
    loadKakaoMap();
  }, []);

  return (
    <MapBox ref={mapContainerRef}>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
    </MapBox>
  );
};

export default KakaoLocation;

// style
const MapBox = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`;
const ErrorMsg = styled.div`
  width: 280px;
  color: tomato;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
