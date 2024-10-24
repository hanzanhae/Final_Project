import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { meetingList } from '../../meetingList';

import DetailInfo from './DetailInfo';
import DetailMember from './DetailMember';

import ThumbNailImg from '../../images/detailThumbnail.jpg';

import {
  DetailContainer,
  ImgBox,
  ThumbNailBox,
  Wrapper
} from '../../styles/detailPage/DetailStyle';

const Detail = () => {
  const { id } = useParams();

  const meet = meetingList.find((m) => m.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      <ThumbNailBox>
        <ImgBox src={ThumbNailImg} alt="thumbNailimg" loading="lazy" />
      </ThumbNailBox>
      <DetailContainer>
        <DetailInfo meet={meet} />
        <DetailMember meet={meet} />
      </DetailContainer>
    </Wrapper>
  );
};

export default Detail;
