import React from 'react';
import styled from 'styled-components';
import ListBoxKeyword from './ListBoxKeyword';
import ListBoxTime from './ListBoxTime';
import ListBoxMembers from './ListBoxMembers';

const MeetingListBox = ({ list, enterMembers }) => {
  return (
    <>
      <ListLi>
        <ThumbNailImg src={list.thumbNail} alt="thumbnail" />
        <InfoBox>
          <ListBoxKeyword list={list} />
          <Title>{list.title}</Title>
          <ListBoxTime list={list} />
          <ListBoxMembers list={list} enterMembers={enterMembers} />
        </InfoBox>
      </ListLi>
    </>
  );
};

export default MeetingListBox;

// style
const ListLi = styled.li`
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 10px 1px #ececec;
  &:hover {
    box-shadow: 0 0 10px 1px ${({ theme }) => theme.pointColorLight};
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
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
`;
