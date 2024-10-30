import styled from 'styled-components';
import { MdOutlineLock } from 'react-icons/md';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { LuAtSign } from 'react-icons/lu';

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.div`
  font-size: 30px;
  font-weight: 900;
  position: relative;
  &::before {
    content: '';
    width: 5px;
    height: 50%;
    background-color: black;
    position: absolute;
    top: 50%;
    left: -30%;
    transform: translate(-50%, -50%);
  }
  margin-bottom: 1rem;
`;
export const Input = styled.input`
  padding: 13px 20px;
  padding-left: 55px;
  height: 48px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
  outline: none;
  color: #c4c3ca;
  background-color: #1f2029;
  border: none;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
  margin: 10px auto;
  &:focus {
    border: none;
    outline: none;
    box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
  }
  &:active {
    border: none;
    outline: none;
    box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
  }
  &:placeholder {
    color: #c4c3ca;
    opacity: 0.7;
    transition: all 200ms linear;
  }
`;
export const InputContainer = styled.div`
  position: relative;
`;
export const ErrorMessage = styled.div`
  font-size: 10px;
  color: red;
  margin: 0;
  padding: 0;
  visibility: ${({ children }) => (children ? 'visible' : 'hidden')};
`;
export const ErrorWrapper = styled.div`
  min-height: 20px;
`;
export const Btn = styled.button`
  width: 222px;
  border-radius: 4px;
  height: 40px;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 20px;
  transition: all 200ms linear;
  padding: 0 30px;
  letter-spacing: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;
  background-color: #ffeba7;
  color: #102770;
  box-shadow: 0 8px 24px 0 rgba(255, 235, 167, 0.2);
  &:focus {
    background-color: #102770;
    color: #ffeba7;
    box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
  }
  &:active {
    background-color: #102770;
    color: #ffeba7;
    box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
  }
  &:hover {
    background-color: #102770;
    color: #ffeba7;
    box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
  }
`;
export const CustomIcon1 = styled(MdOutlineDriveFileRenameOutline)`
  color: #ffeba7;
  font-size: 30px;
  position: absolute;
  top: 30%;
  left: 5%;
  line-height: 48px;
  text-align: left;
`;
export const CustomIcon2 = styled(LuAtSign)`
  color: #ffeba7;
  font-size: 30px;
  position: absolute;
  top: 30%;
  left: 5%;
  line-height: 48px;
  text-align: left;
`;
export const CustomIcon3 = styled(MdOutlineLock)`
  color: #ffeba7;
  font-size: 30px;
  position: absolute;
  top: 30%;
  left: 5%;
  line-height: 48px;
  text-align: left;
`;

export const KakaoLoginBox = styled.div``;
