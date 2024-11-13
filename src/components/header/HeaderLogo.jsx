import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderLogo = ({ loginPath, $color }) => {
  return (
    <Link to="/">
      <Logo $isLogin={loginPath} $color={$color}>
        RUNTO
      </Logo>
    </Link>
  );
};

export default HeaderLogo;

// style
const Logo = styled.h1`
  font-size: 2vw;
  color: ${({ theme, $color }) => $color || theme.textColor};
`;
