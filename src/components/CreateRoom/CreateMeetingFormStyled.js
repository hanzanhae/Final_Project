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
  width: 60vw;
  height: fit-content;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 1920px) {
    width: 70vw;
  }
  @media (max-width: 1600px) {
    width: 75vw;
  }
  @media (max-width: 1440px) {
    padding: 0.5rem 1rem;
  }
`;
export const Title = styled.h1`
  color: #333;
  font-size: 1.3vw;
  position: absolute;
  right: 3%;
  /* left: 50%; */
  /* transform: translateX(-50%); */
  top: -1.5rem;
  text-shadow:
    2px 2px 0px rgba(255, 255, 255, 0.9),
    -2px -2px 0px rgba(255, 255, 255, 0.9),
    2px -2px 0px rgba(255, 255, 255, 0.9),
    -2px 2px 0px rgba(255, 255, 255, 0.9);

  @media (max-width: 1600px) {
    top: -1.2rem;
  }
  @media (max-width: 1440px) {
    top: -1rem;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-grow: 1;
  position: relative;
`;

export const Column = styled.div`
  flex: 1;
  padding: 15px;
  &.right {
    padding-bottom: 10px;
  }
`;

export const FormRow = styled.div`
  margin-bottom: 1.5rem;
`;
export const FormRowImg = styled(FormRow)`
  display: flex;
  gap: 1rem;
`;

export const FormRowInner = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  display: block;
  @media (max-width: 1440px) {
    font-size: 1rem;
  }
`;
export const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 1440px) {
    justify-content: center;
  }
`;
export const NotiText = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
  @media (max-width: 1440px) {
    font-size: 0.8rem;
  }
`;
export const LabelMargin = styled(Label)`
  margin-bottom: 0.5rem;
`;
export const SpanText = styled.span`
  margin-left: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
  @media (max-width: 1440px) {
    margin-left: 0.3rem;
    font-size: 0.8rem;
  }
`;

// export const StyledInputFile = styled.input.attrs({ type: 'file' })`
//   display: none;
// `;
export const StyledInput = styled.input`
  padding: 0.25rem 0.5rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
  @media (max-width: 1440px) {
    font-size: 0.9rem;
  }
`;

export const StyledInputDe = styled.input`
  padding: 0.25rem 0.5rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
  @media (max-width: 1440px) {
    font-size: 0.9rem;
  }
`;
export const StyledInputTt = styled.input`
  width: 70%;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  font-size: 13px;
  border-radius: 5px;
  text-align: center;
  line-height: 1.5;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 1rem;
  }
  @media (max-width: 1440px) {
    &::placeholder {
      font-size: 0.8rem;
    }
  }
`;
export const CustomFileUpload = styled.label`
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 5px;
  background-color: #f7f7f7;
  text-align: center;
  transition: background-color 0.3s;
  margin-bottom: 10px;
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
`;

export const StyledTextarea = styled.textarea`
  resize: vertical;
  padding: 0.5rem;
  width: 100%;
  height: 20vh;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  resize: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 1rem;
  }
  @media (max-width: 1440px) {
    height: 25vh;
    &::placeholder {
      font-size: 0.8rem;
    }
  }
`;
export const LocationBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const StyledButton = styled.button`
  background-color: #87cefa;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition:
    background-color 0.3s,
    transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
  @media (max-width: 1440px) {
    font-size: 14px;
  }
`;
export const AddBtn = styled(StyledButton)`
  width: fit-content;
  margin: auto;
  font-size: 1.1rem;
  position: relative;
  bottom: 0.5rem;
  @media (max-width: 1440px) {
    font-size: 0.9rem;
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
  width: 70%;
  height: 8px;
  background: linear-gradient(
    to right,
    #87cefa 0%,
    #87cefa var(--value),
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
    background: #87cefa;
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

export const RadioBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const RadioLabel = styled.label`
  width: fit-content;
  padding: 0.25rem 1rem;
  border: 2px solid #fff;
  border-radius: 2rem;
  text-align: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  background-color: #efefef;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.pointColorLight};
  }
  &.active {
    background-color: ${({ theme }) => theme.pointColorLight};
    color: ${({ theme }) => theme.pointColor};
  }

  @media (max-width: 1440px) {
    padding: 0.25rem 1rem;
    font-size: 0.8rem;
  }
`;
export const StyledRadioInput = styled.input`
  display: none;
`;
//라디오 추후
