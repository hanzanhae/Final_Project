import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import DetailInfo from './DetailInfo';
import DetailMember from './DetailMember';

import {
  gatheringDetailData,
  gatheringDetailImagesData,
  gatheringDetailMembersData
} from '../../api/api';

// 썸네일기본이미지
import ThumbNailImg from '../../images/detailThumbnail.jpg';

const Detail = ({ openDirectChat }) => {
  const { id } = useParams();

  const [gatheringDetail, setGatheringDetail] = useState(null);
  const [gatheringDetailImages, setGetheringDetailImages] = useState(null);
  const [gatheringDetailMembers, setGetheringDetailMembers] = useState([]);

  const fetchGatheringDetail = async () => {
    const data = await gatheringDetailData(id);
    if (data) {
      setGatheringDetail(data);
    } else {
      console.log('모임상세데이터가 존재하지 않습니다.');
    }
  };
  const fetchGatheringImages = async () => {
    const data = await gatheringDetailImagesData(id);
    if (data) {
      const gatheringImgUrl = data.contentImageUrls[0]?.image_url;
      setGetheringDetailImages(gatheringImgUrl);
    } else {
      console.log('모임상세이미지데이터가 존재하지 않습니다.');
    }
  };
  const fetchGatheringMembers = async () => {
    const data = await gatheringDetailMembersData(id);
    if (data) {
      const gatheringMembers = data.content;
      setGetheringDetailMembers(gatheringMembers);
    } else {
      console.log('모임상세구성원데이터가 존재하지 않습니다.');
    }
  };
  useEffect(() => {
    fetchGatheringDetail();
    fetchGatheringImages();
    fetchGatheringMembers();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <Wrapper>
      <ThumbNailBox>
        <ImgBox
          src={gatheringDetailImages || ThumbNailImg}
          alt="thumbNailimg"
          $gatheringDetailImages={gatheringDetailImages}
          loading="lazy"
          decoding="async"
          onError={(e) => (e.target.src = ThumbNailImg)}
        />
      </ThumbNailBox>
      <DetailContainer>
        <DetailInfo meet={gatheringDetail} />
        <DetailMember
          meet={gatheringDetail}
          membersList={gatheringDetailMembers}
          openDirectChat={openDirectChat}
        />
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
  width: 60%;
  height: 40vh;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  @media (max-width: 1440px) {
    width: 70%;
  }
`;
const ImgBox = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  object-fit: cover;
  object-position: ${({ $gatheringDetailImages }) =>
    $gatheringDetailImages ? 'center' : 'bottom'};
`;
const DetailContainer = styled.div`
  width: 60%;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1440px) {
    width: 70%;
  }
`;
