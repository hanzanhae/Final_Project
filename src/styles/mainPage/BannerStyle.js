import styled from 'styled-components';
import BannerBg from '../../images/bannerBg.jpg';

export const MainBanner = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${BannerBg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;
export const BannerText = styled.div`
  width: fit-content;
  text-align: center;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Title = styled.h2`
  font-size: 4vw;
  color: ${({ theme }) => theme.textColor};
`;
export const Text = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;

export const MakeBtn = styled.button`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 1px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
