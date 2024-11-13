import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BannerBg from '../../images/bannerImg.jpg';
import { CaretRightOutlined } from '@ant-design/icons';

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
          런닝모임 개설하기
          <Icon>
            <CaretRightOutlined />
          </Icon>
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
  position: relative;
  overflow: hidden;
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
  z-index: -99999;
`;
const BannerText = styled.div`
  width: fit-content;
  text-align: center;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Title = styled.h2`
  font-size: 4vw;
  color: ${({ theme }) => theme.textColor};
`;
const Text = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
  @media (max-width: 1440px) {
    font-size: 1rem;
  }
`;
const MakeBtn = styled.button`
  padding: 0.25rem 2rem 0.25rem 1rem;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 10rem;
  border-start-start-radius: 2rem;
  border-bottom-left-radius: 2rem;
  background-color: ${({ theme }) => theme.bgColorBitDark};
  color: ${({ theme }) => theme.textColor};
  font-size: 1vw;
  font-weight: 600;
  letter-spacing: 1px;
  transition: opacity 0.5s;
  @media (max-width: 1440px) {
    bottom: 7rem;
  }
`;
const Icon = styled.div`
  display: flex;
  align-items: center;
  transition: transform 0.5s;

  ${MakeBtn}:hover & {
    transform: translateX(1rem);
  }
`;
