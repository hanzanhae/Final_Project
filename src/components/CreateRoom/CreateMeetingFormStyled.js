import styled from 'styled-components';

export const BodyWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  background-image: url('https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: ${({ theme }) => theme.filter};
`;

export const CreateMeetingFormWrapper = styled.form`
  margin-top: 8vh;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  width: 50vw;
  max-width: 95%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 62vh;

  @media (max-width: 1900px) {
    width: 90vw;
    height: auto;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-grow: 1;
`;

export const Column = styled.div`
  flex: 1;
  padding: 15px;
  &.right {
    padding-bottom: 10px;
  }
`;

export const FormRow = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  font-weight: 700;
  margin-bottom: 5px;
  color: #333;
  display: block;
`;

export const StyledInputFile = styled.input.attrs({ type: 'file' })`
  display: none;
`;

export const CustomFileUpload = styled.label`
  display: inline-block;
  cursor: pointer;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  background-color: #f7f7f7;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #eaeaea;
  }
`;

export const ThumbnailPreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
`;

export const StyledTextarea = styled.textarea`
  resize: vertical;
  width: 90%;
  height: 20vh;
`;

export const StyledButton = styled.button`
  background-color: #94c0da;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition:
    background-color 0.3s,
    transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 10%;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  position: relative;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const CapacitySlider = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  background: linear-gradient(
    to right,
    #4caf50 0%,
    #4caf50 var(--value),
    #ddd var(--value),
    #ddd 100%
  );
  border-radius: 5px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
  }

  &::-moz-range-thumb,
  &::-ms-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
  }
`;

export const CapacityDisplay = styled.span`
  font-weight: 600;
  margin-left: 10px;
`;

export const StyledRadioInput = styled.input.attrs({ type: 'radio' })`
  accent-color: #4e5052;
  margin-left: 6px;
`;
