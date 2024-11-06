import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import DetailInfo from './DetailInfo';
import DetailMember from './DetailMember';
import ThumbNailImg from '../../images/detailThumbNail.jpg';
import {
  gatheringData,
  gatheringDetailData,
  gatheringDetailImagesData,
  gatheringDetailMembersData
} from '../../api/api';

const Detail = () => {
  const { id } = useParams();
  // 모임데이터상태관리🚂...임시
  const [meet, setMeet] = useState(null);

  // 모임목록데이터get🚂...임시
  const fetchGathering = async () => {
    const data = await gatheringData();
    if (data) {
      const gatheringResponse = data.gathering_responses.content;
      const foundMeet = gatheringResponse.find((m) => m.id === parseInt(id));
      setMeet(foundMeet);
    } else {
      console.log('모임목록데이터가 존재하지 않습니다.');
    }
  };
  useEffect(() => {
    fetchGathering();
  }, []);

  // // ...보류
  // const [gatheringDetail, setGetheringDetail] = useState({});
  // const [gatheringDetailImages, setGetheringDetailImages] = useState(null);
  // const [gatheringDetailMembers, setGetheringDetailMembers] = useState([]);

  // // 모임데이터🚂...보류
  // const fetchGatheringDetail = async () => {
  //   const data = await gatheringDetailData();
  //   console.log(data);
  //   if (data) {
  //     setGetheringDetail(data);
  //   } else {
  //     console.log('모임상세데이터가 존재하지 않습니다.');
  //   }
  // };
  // const fetchGatheringImages = async () => {
  //   const data = await gatheringDetailImagesData();
  //   console.log(data);
  //   if (data && data.contentImageUrls.length > 0) {
  //     const gatheringImgUrl = data.contentImageUrls[0].image_url;
  //     setGetheringDetailImages(gatheringImgUrl);
  //   } else {
  //     console.log('모임상세이미지데이터가 존재하지 않습니다.');
  //     setGetheringDetailImages(ThumbNailImg);
  //   }
  // };
  // const fetchGatheringMembers = async () => {
  //   const data = await gatheringDetailMembersData();
  //   console.log(data);
  //   if (data) {
  //     const gatheringMembers = data.content;
  //     setGetheringDetailMembers(gatheringMembers);
  //   } else {
  //     console.log('모임상세구성원데이터가 존재하지 않습니다.');
  //   }
  // };
  // useEffect(() => {
  //   fetchGatheringDetail();
  //   fetchGatheringImages();
  //   fetchGatheringMembers();
  // }, []);

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
      {/* <ThumbNailBox>
        <ImgBox src={gatheringDetailImages} alt="thumbNailimg" loading="lazy" />
      </ThumbNailBox>
      <DetailContainer>
        <DetailInfo meet={gatheringDetail} />
        <DetailMember members={gatheringDetailMembers} />
      </DetailContainer> */}
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
