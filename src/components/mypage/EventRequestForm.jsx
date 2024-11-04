import React, { useState } from 'react';
import styled from 'styled-components';

const EventRequestForm = () => {
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventLocation: '',
    participantCount: '',
    signupDeadline: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));

    // setImageFile(file);
  };

  const handleImageRemove = () => {
    setImageFile(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('eventName', formData.eventName);
    data.append('eventDate', formData.eventDate);
    data.append('eventLocation', formData.eventLocation);
    data.append('participantCount', formData.participantCount);
    data.append('signupDeadline', formData.signupDeadline);

    if (imageFile) {
      data.append('eventImage', imageFile);
    }

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        body: data
      });

      if (!response.ok) {
        throw new Error('서버 통신 중 오류가 발생했습니다.');
      }

      const result = await response.json();
      alert('이벤트가 성공적으로 신청되었습니다!');
      console.log(result);
    } catch (error) {
      alert('이벤트 신청에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <FormContainer onSubmit={handleFormSubmit}>
      <Label htmlFor="eventName">이름</Label>
      <Input
        id="eventName"
        type="text"
        placeholder="이름을 입력하세요"
        onChange={handleInputChange}
      />

      <Label htmlFor="eventDate">날짜</Label>
      <Input
        id="eventDate"
        type="date"
        placeholder="날짜를 입력하세요"
        onChange={handleInputChange}
      />

      <Label htmlFor="eventLocation">장소</Label>
      <Input
        id="eventLocation"
        type="text"
        placeholder="장소를 입력하세요"
        onChange={handleInputChange}
      />

      <Label htmlFor="participantCount">인원 수</Label>
      <Input
        id="participantCount"
        type="number"
        placeholder="인원 수를 입력하세요"
        onChange={handleInputChange}
      />

      <Label htmlFor="signupDeadline">등록 마감 날짜</Label>
      <Input
        id="signupDeadline"
        type="date"
        placeholder="등록 마감 날짜를 입력하세요"
        onChange={handleInputChange}
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
          <ImagePreview
            src={URL.createObjectURL(imageFile)}
            alt="미리 보기 이미지"
          />
          <RemoveButton onClick={handleImageRemove}>x</RemoveButton>
        </ImagePreviewContainer>
      )}
      <Button type="submit">이벤트 신청</Button>
    </FormContainer>
  );
};

// 스타일
const FormContainer = styled.form`
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
