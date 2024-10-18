import styled from 'styled-components';

export const Container = styled.div``;

export const FormContainer = styled.div`
  width: 500px;
  height: 100%;
  margin: 40px auto;
`;

export const Header = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const InputContainer = styled.div``;

export const InputWrapper = styled.div`
  display: flex;
`;

export const SignupInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff; /* 포커스 시 파란 테두리 */
  }
`;

export const ErrorMsg = styled.div`
  font-size: 10px;
  color: red;
`;

export const SmallButton = styled.button`
  width: 150px;
  background-color: #e60023;
  color: white;
  font-size: 13px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SubmitButton = styled.button`
  width: 200px;
  margin-top: 20px;
  padding: 15px;
  background-color: #e60023;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background-color: gray;
  }
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
`;

export const TermsHeader = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
`;

export const TermsWrapper = styled.div`
  font-size: 14px;
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
