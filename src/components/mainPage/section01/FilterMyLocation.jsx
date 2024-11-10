import React from 'react';
import { UniBtn } from '../../button/UniBtn';
import styled from 'styled-components';

const FilterMyLocation = ({ showAddress, handleClickUserLocation }) => {
  return (
    <AddressBox>
      <Address>{showAddress}</Address>
      <UniBtn
        $bordorradius="2rem"
        $padding="0.4rem 1rem"
        onClick={handleClickUserLocation}
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
