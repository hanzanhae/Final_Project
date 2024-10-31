import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderLogo = ({ loginPath }) => {
  return (
    <Link to="/">
      <Logo $isLogin={loginPath}>RUNTO</Logo>
    </Link>
  );
};

export default HeaderLogo;

// style
const Logo = styled.h1`
  color: ${({ theme }) => theme.textColor};
`;
