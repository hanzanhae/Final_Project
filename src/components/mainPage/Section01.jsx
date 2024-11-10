import React, { useEffect, useState } from 'react';
import FilterMenu from './section01/FilterMenu';
import MeetingList from './section01/MeetingList';
import styled from 'styled-components';
import useUserLocation from '../../hooks/useUserLocation';
import useLocationAddress from '../../hooks/useLocationAddress';
import { gatheringForLacation } from '../../api/api';

const Section01 = () => {
  const { addressInfo, getAddressText } = useLocationAddress();
  const { location } = useUserLocation();

  const lat = location?.latitude;
  const lon = location?.longitude;

  const [gatheringIn10km, setGatheringIn10km] = useState([]);
  const [showAddress, setShowAddress] = useState('');

  const getGatheringListForLocation = async () => {
    const res = await gatheringForLacation(lat, lon);
    if (res) {
      const data = res.gatheringResponses;
      setGatheringIn10km(data);
    } else {
      console.log('사용자주변 모임목록데이터가 존재하지 않습니다.');
    }
  };

  const handleClickUserLocation = () => {
    getAddressText(lat, lon);
    getGatheringListForLocation();
  };

  useEffect(() => {
    setShowAddress(addressInfo.fullAddress);
  }, [addressInfo]);

  return (
    <Wrapper>
      <FilterMenu
        showAddress={showAddress}
        handleClickUserLocation={handleClickUserLocation}
        setGatheringIn10km={setGatheringIn10km}
      />
      <MeetingList gatheringIn10km={gatheringIn10km} />
    </Wrapper>
  );
};

export default Section01;

// style
const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.bgColorPage};
`;
