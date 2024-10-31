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
          <CaretRightOutlined />
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
  z-index: 1001;
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
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;

const MakeBtn = styled.button`
  display: flex;
  align-items: center;
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
