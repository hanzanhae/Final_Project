import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const CreateRoom = ({ onSelectLocation }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [addressInfo, setAddressInfo] = useState({
    region1Depth: '', // 시도
    region2Depth: '', // 구
    region3Depth: '', // 동
    fullAddress: '',
    jibunAddress: '',
    roadAddress: '',
    latitude: null,
    longitude: null
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao) {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
          };
          const map = new window.kakao.maps.Map(container, options);
          mapRef.current = map;

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const userLocation = new window.kakao.maps.LatLng(
                  userLat,
                  userLng
                );

                map.setCenter(userLocation);

                const userMarker = new window.kakao.maps.Marker({
                  position: userLocation,
                  map: map
                });

                markerRef.current = userMarker;
              },
              (error) => {
                console.error('Error getting user location:', error);
                setError(
                  '사용자 위치를 가져오는 데 실패했습니다. 위치 정보가 필요합니다.'
                );
              }
            );
          } else {
            setError('Geolocation is not supported by this browser.');
          }

          window.kakao.maps.event.addListener(
            map,
            'click',
            async (mouseEvent) => {
              const latLng = mouseEvent.latLng;

              if (markerRef.current) {
                markerRef.current.setMap(null);
              }

              markerRef.current = new window.kakao.maps.Marker({
                position: latLng,
                map: map
              });

              await getAddressFromCoordinates(latLng.getLat(), latLng.getLng());
            }
          );
        });
      } else {
        console.error('Kakao API not loaded');
        setError('지도 로드에 실패했습니다.');
      }
    };

    loadKakaoMap();
  }, []);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const apiKey = '427a06659472fe8f31f3ffe11ddb64e3';
    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${apiKey}`
        }
      });

      console.log('API Response:', response.data);

      const documents = response.data.documents;

      if (documents.length > 0) {
        const address = documents[0].address;
        const fullAddress = `${address.region_1depth_name} ${address.region_2depth_name} ${address.region_3depth_name}`;
        const roadAddress = documents[0].road_address
          ? documents[0].road_address.address_name
          : '';
        const jibunAddress = address.address_name || '';

        setAddressInfo({
          region1Depth: address.region_1depth_name,
          region2Depth: address.region_2depth_name,
          region3Depth: address.region_3depth_name,
          fullAddress: fullAddress,
          jibunAddress: jibunAddress,
          roadAddress: roadAddress,
          latitude: latitude,
          longitude: longitude
        });

        setError('');
      } else {
        setError('주소를 찾을 수 없습니다.');
      }
    } catch (err) {
      console.error('주소를 가져오는 데 실패했습니다:', err);
      setError('주소를 가져오는 데 실패했습니다. 다시 시도해 주세요.');
      setAddressInfo({
        region1Depth: '',
        region2Depth: '',
        region3Depth: '',
        fullAddress: '',
        jibunAddress: '',
        roadAddress: '',
        latitude: null,
        longitude: null
      });
    }
  };

  const handleSaveLocation = () => {
    if (addressInfo.region3Depth) {
      const {
        latitude,
        longitude,
        region1Depth,
        region2Depth,
        region3Depth,
        roadAddress,
        jibunAddress
      } = addressInfo;
      const address_name = roadAddress ? roadAddress : jibunAddress;
      const locationData = {
        location: {
          address_names: {
            address_name: address_name,
            region_1depth_name: region1Depth,
            region_2depth_name: region2Depth,
            region_3depth_name: region3Depth
          },
          coordinates: {
            x: longitude,
            y: latitude
          },
          region_code: {
            code_h: '123',
            code_b: '456'
          }
        }
      };

      onSelectLocation(locationData);

      console.log('Selected Location Data:', locationData);
    } else {
      alert('위치를 선택해주세요.');
    }
  };

  return (
    <div>
      <h2>위치 선택</h2>
      <div id="map" style={{ width: '100%', height: '300px' }}></div>
      {addressInfo.region3Depth && (
        <div>
          <h3>
            {addressInfo.region1Depth} {addressInfo.region2Depth}{' '}
            {addressInfo.region3Depth}
          </h3>
          <h4>
            {addressInfo.roadAddress
              ? `도로명 주소: ${addressInfo.roadAddress}`
              : `지번 주소: ${addressInfo.jibunAddress || '정보 없음'}`}
          </h4>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSaveLocation}>위치 저장</button>
    </div>
  );
};

export default CreateRoom;
