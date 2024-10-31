import React from 'react';
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
  StyledRadioInput
} from './CreateMeetingFormStyled';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCreateMeetingState } from './useCreateMeetingState';

function CreateMeetingForm() {
  const {
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
    setDeadline,
    thumbnail,
    handleImageChange
  } = useCreateMeetingState();

  const handleCapacityChange = (e) => {
    const value = e.target.value;
    setCapacity(value);
    e.target.style.setProperty('--value', `${((value - 2) / (10 - 2)) * 100}%`);
  };

  return (
    <BodyWrapper>
      <CreateMeetingFormWrapper>
        <FormContainer>
          <Column>
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
                style={{ display: 'none' }}
              />
            </FormRow>

            <FormRow>
              <Label>모일 시간</Label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                dateFormat="Pp"
              />
            </FormRow>

            <FormRow>
              <Label>장소 선택</Label>
              <StyledButton type="button" onClick={() => setShowMapModal(true)}>
                장소 선택하기
              </StyledButton>
              {selectedLocation ? (
                <p>{selectedLocation}</p>
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

            <FormRow>
              <Label>마감 기한</Label>
              <DatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="마감 기한을 선택하세요"
              />
            </FormRow>
          </Column>

          <Column className="right">
            <FormRow>
              <Label>목표 키로수</Label>
              <div>
                {['free', '3', '5', '15', '21.0975', '42.195'].map((val) => (
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
                  '런린이',
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
              <StyledButton type="button">모임 개설</StyledButton>
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
