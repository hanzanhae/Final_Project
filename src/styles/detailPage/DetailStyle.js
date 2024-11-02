import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: auto;
  margin-top: 10vh;
  padding: 1rem 0 3rem;
  width: 70%;
`;

export const ThumbNailBox = styled.div`
  width: 100%;
  height: 40vh;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
`;
export const ImgBox = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  object-fit: cover;
  object-position: bottom;
`;

export const DetailContainer = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
`;

// info style
export const InfoContaier = styled.div`
  width: 67%;
  position: relative;
  top: -2rem;
  left: 0;
`;

export const Infomation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const ProfileBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
`;
export const ProfileImg = styled.div`
  width: 100px;
  aspect-ratio: 1/1;
  background-color: darkblue;
  border-radius: 1.5rem;
`;
export const Name = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
`;

export const InfoTextBox = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
`;
export const Title = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: #333;
`;

export const KeywordBox = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Keywords = styled.div`
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
export const Deadline = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
`;
export const DescriptionBox = styled.div`
  padding: 1rem;
  border: 1px solid #f4f4f5;
  border-radius: 0.5rem;
`;
export const Description = styled.p`
  letter-spacing: 1px;
  line-height: 1.8;
`;

export const InfoTime = styled.div`
  margin-bottom: 2rem;
`;
export const TimeBox = styled.div`
  padding: 0.5rem;
  border: 1px solid #f4f4f5;
  border-radius: 0.5rem;
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
  border: 1px solid #f4f4f5;
  border-radius: 0.5rem;
  overflow: hidden;
`;
export const LocationText = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const Location = styled.p``;

// member style
export const MemberContaier = styled.div`
  margin-top: 100px;
  width: 26%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const MemberTitleBox = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const MemberNumber = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
`;
export const MemberBox = styled.div`
  width: fit-content;
  padding: 0.5rem;
  border: 1px solid #f4f4f5;
  border-radius: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
export const Member = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: #ececec;
  line-height: 44px;
  text-align: center;
  position: relative;
  border: 3px solid #fff;
  &:hover {
    border-color: ${({ theme }) => theme.pointColorLight};
  }
`;
export const Msg = styled.div`
  margin-top: 2rem;
  padding: 0 0.5rem;
  color: red;
  font-size: 0.8rem;
  font-weight: 600;
`;

// member modal
export const MenuBox = styled.div`
  width: 100px;
  height: fit-content;
  background-color: #fff;
  border: 1px solid #ececec;
  border-radius: 0.25rem;
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
  height: 40px;
  font-size: 0.8rem;
  line-height: 40px;
  &:hover {
    color: tomato;
  }
`;

// modal style
export const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  cursor: default;
`;
export const ReportBox = styled.div`
  width: 40vw;
  padding: 1rem 2rem;
  background-color: #fff;
  border: 1px solid #ececec;
  border-radius: 0.25rem;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const ReportTitle = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
`;
export const ReportUl = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
export const ReportLi = styled.li`
  width: fit-content;
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 0.8rem;
  line-height: 40px;
  cursor: pointer;
`;
export const ReportInput = styled.input`
  margin-right: 0.25rem;
  cursor: pointer;
`;
export const ReportLabel = styled.label`
  cursor: pointer;
`;

export const ReportText = styled.p`
  margin-top: 1rem;
  color: #666;
`;
export const ReportBtnBox = styled.div`
  width: fit-content;
  margin: auto;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
`;
