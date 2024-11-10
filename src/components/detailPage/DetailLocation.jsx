import React from 'react';
import styled from 'styled-components';
import useUserLocation from '../../hooks/useUserLocation';
import useKakaoMap from '../../hooks/useKakaoMap';

const KakaoLocation = ({ location }) => {
  const lat = location.lat;
  const lon = location.lon;

  const { errorMsg } = useUserLocation();
  const { mapContainerRef } = useKakaoMap(lat, lon);

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
