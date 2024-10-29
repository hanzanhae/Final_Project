import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const MainMap = () => {
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

            const mapContainer = document.getElementById('map');
            const mapOption = {
              center: new window.kakao.maps.LatLng(userLat, userLng),
              level: 4
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOption);

            fetchMeetings(map, userLat, userLng);
          },
          (error) => {
            console.error('Failed to get user location:', error);
            const defaultPosition = new window.kakao.maps.LatLng(37.5665, 126.978);
            const mapContainer = document.getElementById('map');
            const mapOption = {
              center: defaultPosition,
              level: 3
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOption);

            fetchMeetings(map, 37.5665, 126.978);
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
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const fakeMeetings = response.data.slice(0, 5).map((meeting, index) => ({
      latitude: latitude + index * 0.01,
      longitude: longitude + index * 0.01
    }));

    fakeMeetings.forEach((meeting, index) => {
      const markerPosition = new window.kakao.maps.LatLng(meeting.latitude, meeting.longitude);
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

  return (
    <Container>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>진행중인 모임들</h1>
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

const MapContainer = styled.div`
  width: 142vh;
  height: 90vh;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export default MainMap;
