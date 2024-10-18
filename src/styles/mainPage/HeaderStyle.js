import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  height: 8vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: ${({ $bgcolor }) => $bgcolor};
  box-shadow: 0 0 10px 1px #00000050;
`;
export const HeaderInner = styled.div`
  height: 100%;
  padding: 0 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Logo = styled.h1`
  color: ${({ theme, $isLogin }) => ($isLogin ? '#ffffff' : theme.textColor)};
`;

export const BtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const WeatherCondition = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const WeatherBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
export const WeatherIcon = styled.img`
  width: 1.5rem;
`;
export const WeatherText = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme, $isLogin }) => ($isLogin ? '#ffffff' : theme.textColor)};
`;

export const ThemeBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginBtn = styled.button`
  color: ${({ theme, $isLogin }) => ($isLogin ? '#ffffff' : theme.textColor)};
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;
export const UserBtn = styled.button`
  color: ${({ theme, $isLogin }) => ($isLogin ? '#ffffff' : theme.textColor)};
  font-weight: 600;
  text-transform: uppercase;

  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;
