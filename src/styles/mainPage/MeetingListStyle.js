import styled from 'styled-components';

export const Container = styled.div`
  padding-bottom: 3rem;
  background-color: #fff;
`;
export const ListUl = styled.ul`
  padding: 3rem 5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;
export const ListLi = styled.li`
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

export const ImgBox = styled.div`
  width: 25%;
  aspect-ratio: 1/1;
  border-radius: 0.5rem;
  background-image: url(${(props) => props.$thumbnailimg});
  background-position: center;
`;

export const InfoBox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const KeywordBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const KeywordText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const Keyword = styled.p`
  padding: 0.25rem;
  width: 80px;
  background-color: ${({ theme }) => theme.pointColorLight};
  color: ${({ theme }) => theme.pointColor};
  font-size: 0.7rem;
  font-weight: 700;
  text-align: center;
  border-radius: 1rem;
`;
export const KeywordDate = styled.p`
  color: #666;
`;

export const Title = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
`;

export const TimeBox = styled.div`
  display: flex;
  align-items: center;
`;
export const InnerText = styled.p`
  color: #666;
`;
export const InnerDot = styled.span`
  margin: 0 0.5rem;
  width: 5px;
  aspect-ratio: 1/1;
  background-color: #ececec;
  border-radius: 1rem;
`;
export const Icon = styled.img`
  width: 1rem;
`;

export const MemberBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Members = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
export const Member = styled.p`
  width: 36px;
  height: 36px;
  font-size: 0.6rem;
  border: 3px solid #fff;
  border-radius: 100%;
  background-color: #ececec;
  text-align: center;
  line-height: 30px;
  position: absolute;
  left: ${(props) => props.index * 30}px;
`;
export const Capacity = styled.div`
  font-size: 0.8rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const MoreBtn = styled.button`
  display: block;
  margin: auto;
  padding: 1rem 2rem;
  background-color: #f0f0f0;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
  &:hover {
    color: #000;
  }
`;
export const MoreMsg = styled.p`
  font-size: 0.8rem;
  color: #666;
  text-align: center;
`;
