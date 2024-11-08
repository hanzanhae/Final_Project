import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const EventRequestForm = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    appointed_at: '',
    deadline: '',
    location: {
      address_names: {
        address_name: '',
        region_1depth_name: '',
        region_2depth_name: '',
        region_3depth_name: ''
      },
      coordinates: { x: 0, y: 0 },
      region_code: { code_h: '', code_b: '' }
    },
    max_number: '',
    description: '',
    goal_distance: '',
    concept: ''
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImageUrls([]);
  };

  const uploadImage = async () => {
    const imageData = new FormData();
    imageData.append('file', imageFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: imageData
      });

      if (!response.ok) {
        throw new Error('이미지 업로드 중 오류가 발생했습니다.');
      }

      const result = await response.json();
      return result.content_image_urls;
    } catch (error) {
      console.error(error);
      alert('이미지 업로드에 실패했습니다.');
      return [];
    }
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: async (data) => {
        // Here, you can use additional API calls to get coordinates based on `data.address`
        const coordinates = await fetchCoordinates(data.address);

        setFormData((prevData) => ({
          ...prevData,
          location: {
            ...prevData.location,
            address_names: {
              address_name: data.address,
              region_1depth_name: data.sido,
              region_2depth_name: data.sigungu,
              region_3depth_name: data.bname
            },
            coordinates: {
              x: coordinates.x,
              y: coordinates.y
            },
            region_code: {
              code_h: data.sigunguCode || '', // Adjust based on API response
              code_b: data.bcode || ''
            }
          }
        }));
      }
    }).open();
  };
  const fetchCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
        {
          headers: {
            Authorization: `KakaoAK YOUR_REST_API_KEY`
          }
        }
      );
      const result = await response.json();
      const location = result.documents[0];
      return { x: location.x, y: location.y };
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return { x: 0, y: 0 };
    }
  };

  const handleAddressDetailChange = (e) => {
    const { value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        address_names: {
          ...prevData.location.address_names,
          region_3depth_name: value
        }
      }
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let uploadedImages = [];
    if (imageFile) {
      uploadedImages = await uploadImage();
      if (uploadedImages.length === 0) return;
      setImageUrls(uploadedImages);
    }

    const data = {
      ...formData,
      image_register_response: {
        representative_image_index: 0,
        content_image_urls: uploadedImages
      }
    };

    try {
      const response = await fetch('/gatherings/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
      <Label htmlFor="title">이벤트 이름</Label>
      <Input
        id="title"
        type="text"
        placeholder="이벤트 이름을 입력하세요"
        onChange={handleInputChange}
      />

      <Label htmlFor="eventLocation">장소</Label>
      <AddressWrapper>
        <Input
          type="text"
          value={formData.location?.address_names?.address_name || ''}
          readOnly
          placeholder="주소"
        />
        <AddressButton type="button" onClick={handleAddressSearch}>
          검색
        </AddressButton>
      </AddressWrapper>
      <Input
        type="text"
        value={formData.location?.address_names?.region_3depth_name || ''}
        placeholder="상세 주소"
        onChange={(e) => handleAddressDetailChange(e)}
      />
      <Label htmlFor="appointed_at">날짜</Label>
      <Input
        id="appointed_at"
        type="datetime-local"
        onChange={handleInputChange}
      />

      <Label htmlFor="deadline">등록 마감 날짜</Label>
      <Input id="deadline" type="datetime-local" onChange={handleInputChange} />

      <Label htmlFor="goal_distance">거리</Label>
      <Select id="goal_distance" onChange={handleInputChange}>
        <option value="FREE">자유</option>
        <option value="THREE_KM">3km</option>
        <option value="FIVE_KM">5km</option>
        <option value="FIFTEEN_KM">15km</option>
        <option value="HALF_MARATHON">하프 마라톤 (21.0975km)</option>
        <option value="FULL_MARATHON">풀 마라톤 (42.195km)</option>
      </Select>

      <Label htmlFor="concept">타입</Label>
      <Select id="concept" onChange={handleInputChange}>
        <option value="RUNLINI">런린이</option>
        <option value="GOINMUL">고인물</option>
        <option value="MARATHON">마라톤</option>
        <option value="MORNING_RUNNING">모닝런닝</option>
        <option value="EVENING_RUNNING">퇴근런닝</option>
        <option value="HEALTH">건강</option>
      </Select>

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
  height: 100vh;
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

const AddressWrapper = styled.div`
  display: flex;
`;

const AddressButton = styled.button`
  width: 20%;
  height: 38px;
  background-color: ${({ theme }) => theme.pointColor};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
`;

const Select = styled.select`
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
