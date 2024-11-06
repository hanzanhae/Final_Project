import React, { useState, useRef } from 'react';
import CreateRoom from './CreateRoom';
import {
  BodyWrapper,
  CreateMeetingFormWrapper,
  FormContainer,
  Column,
  FormRow,
  Label,
  CustomFileUpload,
  ThumbnailPreview,
  StyledButton,
  ButtonContainer,
  Modal,
  ModalContent,
  CloseButton,
  CapacitySlider,
  CapacityDisplay,
  StyledTextarea,
  StyledRadioInput,
  StyledInput,
  StyledInputDe,
  StyledInputTt
} from './CreateMeetingFormStyled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCreateMeetingState } from './useCreateMeetingState';
import instance from '../../api/instance';
import axios from 'axios';

function CreateMeetingForm() {
  const {
    title,
    setTitle,
    selectedDate,
    setSelectedDate,
    description,
    setDescription,
    category,
    setCategory,
    capacity,
    setCapacity,
    distance,
    setDistance,
    showMapModal,
    setShowMapModal,
    selectedLocation,
    setSelectedLocation,
    deadline,
    setDeadline
  } = useCreateMeetingState();
  const [thumbnail, setThumbnail] = useState(null);
  const fileRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!fileRef.current || !fileRef.current.files[0]) {
      alert('이미지를 선택해 주세요.');
      return;
    }

    const formData = new FormData();

    formData.append('representative_image_index', JSON.stringify(0));
    formData.append('image_order', JSON.stringify([0]));

    formData.append('images', fileRef.current.files[0]);

    try {
      const response = await axios.post(
        'https://myspringserver.store/images/gatherings',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('업로드 성공:', response.data);
      alert('이미지 업로드 성공!');
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    }
  };

  const handleCapacityChange = (e) => {
    const value = e.target.value;
    setCapacity(value);
    e.target.style.setProperty('--value', `${((value - 2) / (10 - 2)) * 100}%`);
  };

  const handleSubmit = async () => {
    if (!selectedLocation) {
      alert('장소를 선택해주세요.');
      return;
    }

    try {
      const payload = {
        title,
        appointed_at: selectedDate.toISOString(),
        deadline: deadline ? deadline.toISOString() : null,
        location: {
          address_names: {
            address_name: selectedLocation.location.address_names.address_name,
            region_1depth_name:
              selectedLocation.location.address_names.region_1depth_name,
            region_2depth_name:
              selectedLocation.location.address_names.region_2depth_name,
            region_3depth_name:
              selectedLocation.location.address_names.region_3depth_name
          },
          coordinates: {
            x: selectedLocation.location.coordinates.x,
            y: selectedLocation.location.coordinates.y
          },
          region_code: {
            code_h: selectedLocation.location.region_code.code_h,
            code_b: selectedLocation.location.region_code.code_b
          }
        },
        max_number: parseInt(capacity, 10),
        description,
        goal_distance: distance,
        concept: category.toUpperCase(),
        image_register_response: {
          representative_image_index: 0,
          content_image_urls: [
            {
              image_url: thumbnail,
              order: 0
            }
          ],
          representative_image_url: thumbnail
        }
      };
      console.log('Payload:', payload);
      const response = await instance.post('/gatherings', payload);

      console.log('모임 등록 성공:', response.data);
      alert('모임이 성공적으로 등록되었습니다.');
    } catch (error) {
      console.error('모임 등록 실패:', error);
    }
  };
  return (
    <BodyWrapper>
      <CreateMeetingFormWrapper>
        <FormContainer>
          <Column>
            <FormRow>
              <Label>방 이름</Label>
              <StyledInputTt
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="방 이름을 입력하세요"
              />
            </FormRow>
            <FormRow>
              <Label>모임 사진 추가하기</Label>
              <CustomFileUpload htmlFor="thumbnail-upload">
                {thumbnail ? (
                  <ThumbnailPreview src={thumbnail} alt="미리보기" />
                ) : (
                  <span>이미지 업로드</span>
                )}
              </CustomFileUpload>
              <input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileRef}
                style={{ display: 'none' }}
              />
              <StyledButton type="button" onClick={handleImageUpload}>
                이미지 업로드
              </StyledButton>
            </FormRow>
            <FormRow>
              <Label>모일 시간</Label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                dateFormat="Pp"
                customInput={<StyledInput />}
              />
            </FormRow>

            <FormRow>
              <Label>장소 선택</Label>
              <StyledButton type="button" onClick={() => setShowMapModal(true)}>
                장소 선택하기
              </StyledButton>
              {selectedLocation ? (
                <p>{`${selectedLocation.location.address_names.region_2depth_name} ${selectedLocation.location.address_names.region_3depth_name}`}</p>
              ) : (
                <p className="default-text">장소를 선택하세요</p>
              )}
            </FormRow>

            <FormRow>
              <Label>정원</Label>
              <CapacitySlider
                min="2"
                max="10"
                value={capacity}
                onChange={handleCapacityChange}
                style={{ '--value': `${((capacity - 2) / (10 - 2)) * 100}%` }}
              />
              <CapacityDisplay>{capacity}명</CapacityDisplay>
            </FormRow>
          </Column>

          <Column className="right">
            <FormRow>
              <Label>마감 기한</Label>
              <DatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="마감 기한을 선택하세요"
                customInput={<StyledInputDe />}
              />
            </FormRow>
            <FormRow>
              <Label>목표 키로수</Label>
              <div>
                {['FREE', '3', '5', '15', '21.0975', '42.195'].map((val) => (
                  <label key={val}>
                    <StyledRadioInput
                      type="radio"
                      name="distance"
                      value={val}
                      checked={distance === val}
                      onChange={(e) => setDistance(e.target.value)}
                    />
                    {val}
                  </label>
                ))}
              </div>
            </FormRow>

            <FormRow>
              <Label>카테고리</Label>
              <div>
                {[
                  'RUNLINI',
                  '고인물',
                  '마라톤',
                  '모닝런닝',
                  '퇴근런닝',
                  '건강'
                ].map((cat) => (
                  <label key={cat}>
                    <StyledRadioInput
                      type="radio"
                      name="category"
                      value={cat}
                      checked={category === cat}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </FormRow>

            <FormRow>
              <Label>모임에 대한 설명</Label>
              <StyledTextarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
              />
            </FormRow>

            <ButtonContainer>
              <StyledButton type="button" onClick={handleSubmit}>
                모임 개설
              </StyledButton>
            </ButtonContainer>
          </Column>
        </FormContainer>

        {showMapModal && (
          <Modal>
            <ModalContent>
              <CloseButton onClick={() => setShowMapModal(false)}>
                닫기
              </CloseButton>
              <CreateRoom
                onSelectLocation={(location) => {
                  setSelectedLocation(location);
                  setShowMapModal(false);
                }}
              />
            </ModalContent>
          </Modal>
        )}
      </CreateMeetingFormWrapper>
    </BodyWrapper>
  );
}

export default CreateMeetingForm;
