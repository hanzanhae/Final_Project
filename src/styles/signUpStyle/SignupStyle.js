import styled from 'styled-components';

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
export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 20rem;
  align-items: center;
  justify-content: space-around;
`;
export const AddProfileImg = styled.div`
  width: 60px;
  height: 60px;

  display: flex;
  justify-content: center;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  box-sizing: border-box;
  line-height: 0.7;
  font-size: 4rem;
  border: ${(props) =>
    props.$isselected ? '4px solid yellow' : '2px solid gray'};
`;
export const ProfileImg1 = styled.div`
  border: ${(props) => (props.$isselected ? '4px' : '2px')} solid
    ${(props) => (props.$isselected ? 'yellow' : 'gray')};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: url(${(props) => props.backgroundimage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 1rem auto;
  cursor: pointer;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 20rem;
`;

export const InputWrapper = styled.div`
  display: flex;
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

export const ErrorMsg = styled.div`
  font-size: 10px;
  color: red;
`;

export const SmallButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  border-radius: 4px;
  height: 40px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  transition: all 200ms linear;
  padding: 0 10px;
  letter-spacing: 1px;
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

export const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GenderWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const GenderLabel = styled.label`
  margin-right: 15px;
  font-size: 14px;
`;

export const TermsContainer = styled.div`
  margin-top: 10px;
  padding: 2rem;
  font-size: 16px;
`;

export const TermsHeader = styled.div`
  font-size: 0.6vw;
  margin-bottom: 10px;
`;

export const TermsWrapper = styled.div`
  font-size: 1rem;
  margin-bottom: 5px;
`;

export const Checkbox = styled.input`
  margin-right: 5px;
`;

export const EmailStatusMessage = styled.p`
  color: ${(props) => (props.success ? 'green' : 'red')};
  font-size: 12px;
  margin-top: 5px;
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
