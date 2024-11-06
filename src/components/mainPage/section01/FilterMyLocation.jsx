import React, { useEffect, useState } from 'react';
import { UniBtn } from '../../button/UniBtn';
import styled from 'styled-components';
import useLocationAddress from '../../../hooks/useLocationAddress';

const FilterMyLocation = ({ location }) => {
  const { addressInfo, getAddressText } = useLocationAddress();
  const [showAddress, setShowAddress] = useState('');

  const getUserDetailAddress = () => {
    if (location) {
      const lat = location.latitude;
      const lon = location.longitude;

      getAddressText(lat, lon);
      // console.log(showAddress);
      // setShowAddress(addressInfo.fullAddress);
    }
  };

  useEffect(() => {
    setShowAddress(addressInfo.fullAddress);
  }, [addressInfo]);

  return (
    <AddressBox>
      <Address>{showAddress}</Address>
      <UniBtn
        $bordorradius="2rem"
        $padding="0.4rem 1rem"
        onClick={getUserDetailAddress}
      >
        내주변모임
      </UniBtn>
    </AddressBox>
  );
};

export default FilterMyLocation;

// style
const AddressBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Address = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.pointColor};
`;
