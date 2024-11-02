import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { meetingList } from '../../data/meetingList';
import DetailInfo from './DetailInfo';
import DetailMember from './DetailMember';
import ThumbNailImg from '../../images/detailThumbNail.jpg';

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

// style
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0 3rem;
  background-color: ${({ theme }) => theme.bgColorPage};
`;
const ThumbNailBox = styled.div`
  margin-top: 10vh;
  width: 70%;
  height: 40vh;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
`;
const ImgBox = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  object-fit: cover;
  object-position: bottom;
`;
const DetailContainer = styled.div`
  width: 70%;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
`;
