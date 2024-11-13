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
  StyledInputTt,
  LocationBox
} from './CreateMeetingFormStyled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCreateMeetingState } from './useCreateMeetingState';
import instance from '../../api/instance';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { postGroupChatRoomId, postImgData } from '../../api/api';

function CreateMeetingForm() {
  const {
    title,
    setTitle,
    selectedDate,
    setSelectedDate,
    description,
    setDescription,

    capacity,
    setCapacity,

    showMapModal,
    setShowMapModal,
    selectedLocation,
    setSelectedLocation,
    deadline,
    setDeadline
  } = useCreateMeetingState();
  const navigate = useNavigate();
  const [distance, setDistance] = useState('FREE');
  const [category, setCategory] = useState('RUNLINI');
  const [thumbnail, setThumbnail] = useState(null);
  const fileRef = useRef(null);
  const uniqueId = uuidv4();
  const [representativeImageUrl, setRepresentativeImageUrl] = useState(null);
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

    const files = fileRef.current.files;
    const data = {
      image_orders: [0],
      representative_image_index: 0
    };

    const formData = new FormData();
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });

    formData.append('request', blob);

    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const response = await postImgData(formData);

      console.log('업로드 성공:', response.data);
      alert('이미지 업로드 성공!');

      setRepresentativeImageUrl(response.data.representative_image_url);
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

  const distanceOptions = {
    FREE: { label: 'free' },
    THREE_KM: { label: '3km' },
    FIVE_KM: { label: '5km' },
    FIFTEEN_KM: { label: '15km' },
    HALF_MARATHON: { label: '21.0975km' },
    FULL_MARATHON: { label: '42.195km' }
  };
  const categoryOptions = {
    RUNLINI: { label: '런린이' },
    GOINMUL: { label: '고인물' },
    MARATHON: { label: '마라톤' },
    MORNING_RUNNING: { label: '모닝런닝' },
    EVENING_RUNNING: { label: '퇴근런닝' },
    HEALTH: { label: '건강' }
  };
  const handleDistanceChange = (e) => {
    const selectedKey = e.target.value;
    setDistance(selectedKey);
  };

  const handleSubmit = async () => {
    if (thumbnail && !representativeImageUrl) {
      alert('이미지를 등록해주세요.');
      return;
    }
    if (!selectedLocation) {
      alert('장소를 선택해주세요.');
      return;
    }
    if (!deadline || !selectedDate) {
      alert('모임 시간과 마감 기한을 설정해주세요.');
      return;
    }

    if (deadline && selectedDate) {
      const selectedDateObj = new Date(selectedDate);
      const deadlineObj = new Date(deadline);

      console.log('selectedDateObj:', selectedDateObj);
      console.log('deadlineObj:', deadlineObj);

      const selectedDateUTC = selectedDateObj.getTime();
      const deadlineUTC = deadlineObj.getTime();

      const differenceInHours =
        (selectedDateUTC - deadlineUTC) / (1000 * 60 * 60);
      if (selectedDateUTC <= deadlineUTC) {
        alert('모임 시간은 마감 기한 이후에 설정되어야 합니다.');
        return;
      }
      console.log('differenceInHours:', differenceInHours);

      if (differenceInHours < 2) {
        alert('약속 날짜와 마감 날짜는 최소 2시간의 차이가 있어야 합니다.');
        return;
      }
    }
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
      concept: category.toUpperCase()
    };

    if (representativeImageUrl) {
      payload.image_register_response = {
        representative_image_index: 0,
        content_image_urls: [
          {
            image_url: representativeImageUrl,
            order: 0
          }
        ],
        representative_image_url: representativeImageUrl
      };
    }

    try {
      const response = await instance.post('/gatherings', payload);
      const response2 = await postGroupChatRoomId(response.data.gathering_id);
      console.log('모임 등록 성공:', response.data.gathering_id);
      console.log(response2);
      alert('모임이 성공적으로 등록되었습니다.');

      navigate('/');
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
                placeholder="제목은 5~20자 내로 입력해주세요."
              />
            </FormRow>
            <FormRow>
              <Label>모임 사진 추가하기</Label>
              <CustomFileUpload htmlFor="thumbnail-upload">
                {thumbnail ? (
                  <ThumbnailPreview src={thumbnail} alt="미리보기" />
                ) : (
                  <span>이미지 선택</span>
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
                이미지 등록
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
              <LocationBox>
                <StyledButton
                  type="button"
                  onClick={() => setShowMapModal(true)}
                >
                  장소 선택하기
                </StyledButton>
                {selectedLocation ? (
                  <p>{`${selectedLocation.location.address_names.region_2depth_name} ${selectedLocation.location.address_names.region_3depth_name}`}</p>
                ) : (
                  <p className="default-text">장소를 선택하세요</p>
                )}
              </LocationBox>
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
                {Object.keys(distanceOptions).map((key) => (
                  <label key={key}>
                    <StyledRadioInput
                      type="radio"
                      name="distance"
                      value={key}
                      checked={distance === key}
                      onChange={handleDistanceChange}
                    />
                    {distanceOptions[key].label}
                  </label>
                ))}
              </div>
            </FormRow>
            <FormRow>
              <Label>카테고리</Label>
              <div>
                {Object.keys(categoryOptions).map((key) => (
                  <label key={key}>
                    <StyledRadioInput
                      type="radio"
                      name="category"
                      value={key}
                      checked={category === key}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    {categoryOptions[key].label}
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
                placeholder=" 본문 내용은 10~200 자 내로 입력해주세요."
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
