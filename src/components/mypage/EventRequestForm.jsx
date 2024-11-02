import React, { useState } from 'react';
import styled from 'styled-components';

const EventRequestForm = () => {
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file));
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
  };

  return (
    <FormContainer>
      <Label htmlFor="eventName">이름</Label>
      <Input id="eventName" type="text" placeholder="이름을 입력하세요" />

      <Label htmlFor="eventDate">날짜</Label>
      <Input id="eventDate" type="date" placeholder="날짜를 입력하세요" />

      <Label htmlFor="eventLocation">장소</Label>
      <Input id="eventLocation" type="text" placeholder="장소를 입력하세요" />

      <Label htmlFor="participantCount">인원 수</Label>
      <Input
        id="participantCount"
        type="number"
        placeholder="인원 수를 입력하세요"
      />

      <Label htmlFor="signupDeadline">등록 마감 날짜</Label>
      <Input
        id="signupDeadline"
        type="date"
        placeholder="등록 마감 날짜를 입력하세요"
      />

      <Label htmlFor="eventImage">이미지 업로드</Label>
      <FileInput
        id="eventImage"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />

      {imageFile && (
        <ImagePreviewContainer>
          <ImagePreview src={imageFile} alt="미리 보기 이미지" />
          <RemoveButton onClick={handleImageRemove}>x</RemoveButton>
        </ImagePreviewContainer>
      )}

      <Button>이벤트 신청</Button>
    </FormContainer>
  );
};

// 스타일
const FormContainer = styled.div`
  width: 300px;
  height: 80vh;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  top: 20px;
  right: 20px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const FileInput = styled.input`
  margin-top: 10px;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const ImagePreview = styled.img`
  width: 80%;
  height: 100px;
  border-radius: 8px;
  margin-right: 10px;
`;

const RemoveButton = styled.button`
  background-color: #ccc;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.7rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.pointColor};
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 25px;
`;

export default EventRequestForm;
