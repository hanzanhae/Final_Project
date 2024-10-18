import React from 'react';

import { Link } from 'react-router-dom';
import { BannerText, MainBanner, MakeBtn, Text, Title } from '../../styles/mainPage/BannerStyle';

const Banner = () => {
  return (
    <MainBanner>
      <BannerText>
        <Title>런닝으로 만나는 우리</Title>
        <Text>관심사 기반 커뮤니티, 런토</Text>
      </BannerText>
      <Link to="/addMeet">
        <MakeBtn>런닝모임 개설하기 ▶</MakeBtn>
      </Link>
    </MainBanner>
  );
};

export default Banner;
