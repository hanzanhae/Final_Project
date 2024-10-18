import styled from 'styled-components';
import ThumbNailImg from '../../images/thumbnail.jpg';

export const Wrapper = styled.div`
  margin-top: 10vh;
  padding: 3rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

// info style
export const InfoContaier = styled.div`
  width: 40%;
  padding-bottom: 2rem;
  background-color: #f5f5f5;
`;
export const ThumbNailImage = styled.div`
  width: 100%;
  height: 30vh;
  background-image: url(${ThumbNailImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
export const InfoThumbNail = styled.div`
  width: 90%;
  padding: 1rem;
  background-color: #fff;
  border-radius: 1rem;
  position: relative;
  top: -2rem;
  left: 0;
  right: 0;
  margin: auto;
`;
export const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  position: relative;
  top: -2rem;
`;
export const ProfileImg = styled.p`
  width: 50px;
  aspect-ratio: 1/1;
  background-color: darkblue;
  border-radius: 100%;
`;
export const Name = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
`;
export const TitleBox = styled.h4`
  text-align: center;
  font-size: 1.1rem;
  color: #333;
  position: relative;
  top: -1rem;
`;
export const KeywordBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Keywords = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const Keyword = styled.p`
  padding: 0.25rem;
  width: 80px;
  background-color: ${({ theme }) => theme.pointColorLight};
  color: ${({ theme }) => theme.pointColor};
  font-size: 0.7rem;
  font-weight: 600;
  text-align: center;
  border-radius: 1rem;
`;
export const Deadline = styled.p`
  font-size: 0.8rem;
`;

export const InfoTime = styled.div`
  padding: 0 2rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const Date = styled.p``;
export const Time = styled.p``;
export const Icon = styled.img`
  width: 1rem;
`;

export const InfoLocation = styled.div``;
export const LocationBox = styled.div`
  margin-bottom: 0.5rem;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const Location = styled.p``;
export const LocationMap = styled.div`
  width: 100%;
  height: 200px;
  background-color: skyblue;
`;

export const InfoDescription = styled.div`
  padding: 2rem;
`;
export const Description = styled.p`
  letter-spacing: 1px;
  line-height: 1.5;
`;

// member style
export const MemberContaier = styled.div`
  width: 20%;
  padding: 1rem;
  /* background-color: beige; */
`;
export const RegisterBtn = styled.button`
  float: right;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.pointColor};
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
`;
export const MemberTitleBox = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const MemberTitle = styled.p``;
export const MemberNumber = styled.p``;
export const MemberBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
export const Member = styled.button`
  width: 50px;
  aspect-ratio: 1/1;
  border-radius: 100%;
  background-color: beige;
  line-height: 50px;
  text-align: center;
  position: relative;
`;

// member modal
export const MenuBox = styled.div`
  width: 120px;
  background-color: #f0f0f0;
  position: absolute;
  z-index: 99;
  top: 2.3rem;
  left: 2.3rem;
`;
export const MenuUl = styled.ul`
  width: 100%;
`;
export const MenuLi = styled.li`
  width: 100%;
  padding: 0.75rem 0;
  font-size: 0.8rem;
  line-height: 1;
  &:hover {
    color: red;
  }
`;

// 채팅
export const ChatBtn = styled.button`
  width: 60px;
  aspect-ratio: 1/1;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.pointColorLight};
  color: ${({ theme }) => theme.pointColor};
  font-weight: 600;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
`;
