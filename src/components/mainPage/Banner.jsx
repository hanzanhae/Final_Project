import React from 'react';
import { Link } from 'react-router-dom';

import ArrowIcon from '../../icons/arrow-double.svg';
import {
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
