import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ListBoxKeyword from './ListBoxKeyword';
import ListBoxTime from './ListBoxTime';
import ListBoxMembers from './ListBoxMembers';
import { format } from 'date-fns';
import { gatheringDetailImagesData } from '../../../api/api';

// 기본썸네일이미지
import ThumbImage from '../../../images/thumbnail.jpg';

const MeetingListBox = ({ list }) => {
  const [isOver, setIsOver] = useState(false);
  const [registeredImg, setRegisteredImg] = useState(null);

  const fetchRegisteredImg = async () => {
    const gatheringID = list.id;
    const data = await gatheringDetailImagesData(gatheringID);
    if (data) {
      setRegisteredImg(data.contentImageUrls[0]?.image_url);
    }
  };

  const handleDeadlineMeeting = () => {
    const deadlineDate = format(new Date(list.deadline), 'yyyy-MM-dd');
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    if (deadlineDate < currentDate) {
      setIsOver(true);
    }
  };
  useEffect(() => {
    handleDeadlineMeeting();
    fetchRegisteredImg();
  }, []);

  return (
    <>
      <ListLi $isOver={isOver}>
        <DeadlineNotice>마감된 모임입니다.</DeadlineNotice>
        {registeredImg ? (
          <ThumbNailImg
            src={registeredImg}
            alt="registered-thumbnail"
            onError={(e) => (e.target.src = ThumbImage)}
          />
        ) : (
          <ThumbNailImg src={ThumbImage} alt="thumbnail" />
        )}
        <InfoBox>
          <ListBoxKeyword list={list} />
          <Title>{list.title}</Title>
          <ListBoxTime list={list} />
          <ListBoxMembers list={list} />
        </InfoBox>
      </ListLi>
    </>
  );
};

export default MeetingListBox;

// style
const DeadlineNotice = styled.div`
  width: 100%;
  height: 250px;
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  border-radius: 0.5rem;
  text-align: center;
  line-height: 220px;
  letter-spacing: 1px;
  font-size: 1.1rem;
  font-weight: 600;
  color: red;
  opacity: 0;

  @media (max-width: 1440px) {
    height: 200px;
  }
`;
const ListLi = styled.li`
  width: 100%;
  height: 250px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 10px 1px #ececec;
  position: relative;
  &:hover {
    box-shadow: 0 0 10px 1px ${({ theme }) => theme.pointColorLight};
    ${DeadlineNotice} {
      opacity: ${({ $isOver }) => ($isOver ? '1' : '0')};
    }
  }

  @media (max-width: 1440px) {
    height: 200px;
  }
`;

const ThumbNailImg = styled.img`
  width: 25%;
  aspect-ratio: 1/1;
  border-radius: 0.5rem;
`;
const InfoBox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  color: #333;
  @media (max-width: 1440px) {
    font-size: 1.1rem;
  }
`;
