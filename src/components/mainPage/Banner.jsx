import React from 'react';
import { Link } from 'react-router-dom';

import BannerBg from '../../images/bannerBg.webp';

import ArrowIcon from '../../icons/arrow-double.svg';
import {
  BannerImg,
  BannerText,
  Icon,
  MainBanner,
  MakeBtn,
  Text,
  Title
} from '../../styles/mainPage/BannerStyle';

const Banner = () => {
  return (
    <MainBanner>
      <BannerImg src={BannerBg} alt="bannerimg" loading="lazy" />
      <BannerText>
        <Title>런닝으로 만나는 우리</Title>
        <Text>관심사 기반 커뮤니티, 런토</Text>
      </BannerText>
      <Link to="/addMeet">
        <MakeBtn>
          런닝모임 개설하기
          <Icon src={ArrowIcon} alt="arrow-icon" />
        </MakeBtn>
      </Link>
    </MainBanner>
  );
};

export default Banner;
