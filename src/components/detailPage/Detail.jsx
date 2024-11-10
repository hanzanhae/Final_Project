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
import ThumbNailImg from '../../images/detailThumbNail.jpg';

const Detail = () => {
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
        />
      </ThumbNailBox>
      <DetailContainer>
        <DetailInfo meet={gatheringDetail} />
        <DetailMember
          meet={gatheringDetail}
          membersList={gatheringDetailMembers}
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
  object-position: ${({ $gatheringDetailImages }) =>
    $gatheringDetailImages ? 'center' : 'bottom'};
`;
const DetailContainer = styled.div`
  width: 70%;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
`;
