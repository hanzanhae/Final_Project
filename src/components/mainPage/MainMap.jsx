import React, { useEffect, useState } from 'react';
import { gatheringForLacation } from '../../api/api';
import {
  Container,
  Controls,
  MapContainer,
  MapWrapper,
  TitleBox,
  MapTitle,
  Wrapper
} from './MainMapStyled';
import { useNavigate } from 'react-router-dom';
import KakaoMapSearch from './KakaoMapSearch';

const MainMap = () => {
  const [map, setMap] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [gatheringMarkers, setGatheringMarkers] = useState([]);
  const navigate = useNavigate();
  const [gatheringResponses, setGatheringResponses] = useState([]);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=e8b68cee6e1c3b846aeee23216a1ab59&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude + 0.9 / 111;
            const userLng =
              position.coords.longitude -
              0.1 /
                (111 * Math.cos(position.coords.latitude * (Math.PI / 180)));
            setUserPosition({ latitude: userLat, longitude: userLng });

            const mapContainer = document.getElementById('map');
            const mapOption = {
              center: new window.kakao.maps.LatLng(userLat, userLng),
              level: 4
            };
            const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
            setMap(newMap);

            fetchMeetings(newMap, userLat, userLng);
          },
          (error) => {
            console.error('Failed to get user location:', error);
            const defaultPosition = new window.kakao.maps.LatLng(
              37.5665,
              126.978
            );
            const mapContainer = document.getElementById('map');
            const mapOption = { center: defaultPosition, level: 7 };
            const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
            setMap(newMap);

            fetchMeetings(newMap, 37.5665, 126.978);
          }
        );
      });
    };

    script.onerror = () => {
      console.error('Failed to load Kakao Maps script');
    };

    document.head.appendChild(script);
  }, []);

  const fetchMeetings = async (map, latitude, longitude) => {
    const res = await gatheringForLacation(latitude, longitude);
    setGatheringResponses(res?.gatheringResponses || []);

    if (res) {
      const meetings = res.gatheringResponses;
      const markers = meetings
        .map((meeting) => {
          const meetingLat = meeting.location.coordinates.y;
          const meetingLng = meeting.location.coordinates.x;

          if (meetingLat && meetingLng) {
            const distance = calculateDistance(
              latitude,
              longitude,
              meetingLat,
              meetingLng
            );

            if (distance <= 10) {
              const markerPosition = new window.kakao.maps.LatLng(
                meetingLat,
                meetingLng
              );
              const marker = new window.kakao.maps.Marker({
                position: markerPosition
              });
              marker.setMap(map);

              window.kakao.maps.event.addListener(marker, 'click', () => {
                navigate(`/gatherings/${meeting.id}`);
              });

              return marker;
            }
          }
        })
        .filter(Boolean);

      setGatheringMarkers(markers);
    } else {
      console.log('사용자 주변에 모임이 없습니다.');
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const clearMarkers = () => {
    gatheringMarkers.forEach((marker) => marker.setMap(null));
    setGatheringMarkers([]);
  };

  const handleMapDragEnd = () => {
    const center = map.getCenter();
    const latitude = center.getLat();
    const longitude = center.getLng();
    console.log('새로운 중심 좌표:', latitude, longitude);
    clearMarkers();
    fetchMeetings(map, latitude, longitude);
  };

  useEffect(() => {
    if (map) {
      window.kakao.maps.event.addListener(map, 'dragend', handleMapDragEnd);
    }
    return () => {
      if (map) {
        window.kakao.maps.event.removeListener(
          map,
          'dragend',
          handleMapDragEnd
        );
      }
    };
  }, [map]);

  return (
    <Wrapper>
      <Container>
        <TitleBox>
          <MapTitle style={{ textAlign: 'center', marginBottom: '20px' }}>
            진행중인 모임들
          </MapTitle>
          <Controls>
            <button
              onClick={() =>
                map.setCenter(
                  new window.kakao.maps.LatLng(
                    userPosition.latitude,
                    userPosition.longitude
                  )
                )
              }
            >
              현재 위치로 이동
            </button>
          </Controls>
        </TitleBox>
        <MapWrapper>
          <MapContainer id="map"></MapContainer>
          {map && (
            <KakaoMapSearch
              map={map}
              gatherings={gatheringResponses}
              clearMarkers={clearMarkers}
            />
          )}
        </MapWrapper>
      </Container>
    </Wrapper>
  );
};

export default MainMap;
