import { useState, useEffect, useRef } from 'react';

const apiKey = process.env.REACT_APP_DETAIL_KAKAO_API_KEY;
const KakaoUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;

const useKakaoMap = (latitude, longitude) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');

  const loadKakaoMap = () => {
    const script = document.createElement('script');
    script.src = KakaoUrl;
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        // 기본위치: 서울
        const mapOption = {
          center: new window.kakao.maps.LatLng(
            latitude || 33.450701,
            longitude || 126.570667
          ),
          level: 3
        };
        mapRef.current = new window.kakao.maps.Map(
          mapContainerRef.current,
          mapOption
        );
        if (latitude && longitude) {
          const userPosition = new window.kakao.maps.LatLng(
            latitude,
            longitude
          );
          mapRef.current.setCenter(userPosition);

          const marker = new window.kakao.maps.Marker({
            position: userPosition
          });
          marker.setMap(mapRef.current);
        }
      } else {
        console.error('Kakao Maps API 로드에 실패했습니다.');
        setErrorMsg('카카오 지도 API 로드에 실패했습니다.');
      }
    };
    document.head.appendChild(script);
  };

  useEffect(() => {
    if (latitude && longitude) {
      loadKakaoMap();
    }
  }, [latitude, longitude]);

  return { mapContainerRef, mapRef, errorMsg };
};

export default useKakaoMap;
