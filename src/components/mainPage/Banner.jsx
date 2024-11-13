import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import BannerBg from '../../images/bannerImg.jpg';

const Banner = () => {
  return (
    <MainBanner>
      <BannerImg
        src={BannerBg}
        alt="bannerimg"
        loading="lazy"
        decoding="async"
      />
      <BannerText>
        <Title>런닝으로 만나는 우리</Title>
        <Text>관심사 기반 커뮤니티, 런토</Text>
      </BannerText>
      <Link to="/addMeet">
        <MakeBtn>
          <BtnText>런닝모임 개설하기</BtnText>
        </MakeBtn>
      </Link>
    </MainBanner>
  );
};

export default Banner;

// style
const MainBanner = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 1;
  filter: ${({ theme }) => theme.filter};
`;
const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  object-position: bottom;
  z-index: -999;
`;
const BannerText = styled.div`
  width: fit-content;
  text-align: center;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const slideUpBlind = keyframes`
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Title = styled.h2`
  height: fit-content;
  font-size: 4vw;
  color: ${({ theme }) => theme.textColor};
  opacity: 0;
  transform: translateY(50px);
  animation: ${slideUpBlind} 1s ease-out forwards;
`;
const Text = styled.p`
  height: fit-content;
  font-size: 1.2vw;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
  opacity: 0;
  transform: translateY(50px);
  animation: ${slideUpBlind} 1s ease-out 0.3s forwards;
`;
const BtnText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.1vw;
  font-weight: 600;
  letter-spacing: 1px;
  transition: 0.5s;
`;
const MakeBtn = styled.button`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 3rem;
  background-color: ${({ theme }) => theme.bgColorBitDark};
  border-radius: 2rem;

  &:hover {
    ${BtnText} {
      transform: translateY(-5px);
      transition: 0.5s;
    }
  }
`;
