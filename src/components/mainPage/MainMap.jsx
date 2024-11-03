import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const MainMap = () => {
  const [map, setMap] = useState(null);
  const [radius, setRadius] = useState(10); // 기본 반경 10키로
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=e8b68cee6e1c3b846aeee23216a1ab59&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            setUserPosition({ latitude: userLat, longitude: userLng });

            const mapContainer = document.getElementById('map');
            const mapOption = {
              center: new window.kakao.maps.LatLng(userLat, userLng),
              level: 4
            };
            const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
            setMap(newMap);

            fetchMeetings(newMap, userLat, userLng, radius);
          },
          (error) => {
            console.error('Failed to get user location:', error);
            const defaultPosition = new window.kakao.maps.LatLng(
              37.5665,
              126.978
            );
            const mapContainer = document.getElementById('map');
            const mapOption = {
              center: defaultPosition,
              level: 7
            };
            const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
            setMap(newMap);
            fetchMeetings(newMap, 37.5665, 126.978, radius);
          }
        );
      });
    };

    script.onerror = () => {
      console.error('Failed to load Kakao Maps script');
    };

    document.head.appendChild(script);
  }, []);

  const fetchMeetings = async (map, latitude, longitude, radius) => {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    const fakeMeetings = response.data
      .slice(0, 5)
      .map(() => {
        const randomOffset = (Math.random() - 0.5) * (radius / 110);
        const meetingLatitude = latitude + randomOffset;
        const meetingLongitude = longitude + randomOffset;

        const isWithinRadius =
          calculateDistance(
            latitude,
            longitude,
            meetingLatitude,
            meetingLongitude
          ) <= radius;
        return isWithinRadius
          ? { latitude: meetingLatitude, longitude: meetingLongitude }
          : null;
      })
      .filter(Boolean);

    fakeMeetings.forEach((meeting, index) => {
      const markerPosition = new window.kakao.maps.LatLng(
        meeting.latitude,
        meeting.longitude
      );
      const marker = new window.kakao.maps.Marker({ position: markerPosition });
      marker.setMap(map);

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">런닝모임 ${index + 1}</div>`
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.open(map, marker);
      });
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) *
        Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const handleRadiusChange = (event) => {
    const newRadius = Number(event.target.value);
    setRadius(newRadius);
    if (map && userPosition) {
      fetchMeetings(
        map,
        userPosition.latitude,
        userPosition.longitude,
        newRadius
      );
    }
  };

  const goToCurrentLocation = () => {
    if (map && userPosition) {
      const position = new window.kakao.maps.LatLng(
        userPosition.latitude,
        userPosition.longitude
      );
      map.setCenter(position);
    } else {
      alert('사용자의 위치를 불러올 수 없습니다.');
    }
  };

  return (
    <Container>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        진행중인 모임들
      </h1>
      <Controls>
        <label>
          반경 선택:
          <select value={radius} onChange={handleRadiusChange}>
            <option value={10}>10 km</option>
          </select>
        </label>
        <button onClick={goToCurrentLocation}>현재 위치로 이동</button>
      </Controls>
      <MapContainer id="map"></MapContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  background-color: #ffffff;
  min-height: 100vh;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #e2e2e2, #ffffff);
`;

const Controls = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;

  label {
    display: flex;
    align-items: center;
  }

  button {
    padding: 10px 20px;
    background: linear-gradient(135deg, #0078d4, #005a9e);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #005a9e, #0078d4);
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);
      transform: translateY(-2px);
    }

    &:active {
      background: linear-gradient(135deg, #00427a, #005a9e);
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
      transform: translateY(0px);
    }
  }
`;

const MapContainer = styled.div`
  width: 150vh;
  height: 70vh;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export default MainMap;
