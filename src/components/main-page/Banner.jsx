import React from 'react';
import styled from 'styled-components';

import BannerBg from '../../images/bannerBG.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <MainBanner>
      <BannerText>
        <Title>런닝으로 만나는 우리</Title>
        <Text>관심사 기반 커뮤니티, 런토</Text>
        <Link to="/addMeet">
          <MakeBtn>런닝모임 개설하기</MakeBtn>
        </Link>
      </BannerText>
    </MainBanner>
  );
};

export default Banner;

// style
const MainBanner = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${BannerBg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;
const BannerText = styled.div`
  position: absolute;
  bottom: 20%;
  left: 5rem;
  padding: 3rem 2rem;
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 0.5rem;
`;

const Title = styled.h2`
  font-size: 4vw;
  color: ${({ theme }) => theme.textColor};
`;
const Text = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textColor};
`;

const MakeBtn = styled.button`
  margin-top: 2rem;
  padding: 1.5rem 4rem;
  background-color: ${({ theme }) => theme.pointColor};
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 1px;
  border-radius: 1rem;
`;
