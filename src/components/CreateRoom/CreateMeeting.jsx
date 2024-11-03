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
  StyledRadioInput,
  StyledInput,
  StyledInputDe,
  StyledInputTt
} from './CreateMeetingFormStyled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCreateMeetingState } from './useCreateMeetingState';
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
    setDeadline,
    thumbnail,
    handleImageChange
  } = useCreateMeetingState();

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
        gathering_type: 'GENERAL',
        // order_by: 'created_at',
        // sort_direction: 'ASC',
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

      const response = await axios.post(
        'https://myspringserver.store/gatherings',
        payload,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log('모임 등록 성공:', response.data);
      alert('모임이 성공적으로 등록되었습니다.');
    } catch (error) {
      console.error('모임 등록 실패:', error);
      const errorMessage =
        error.response?.data?.message ||
        '모임 등록에 실패했습니다. 다시 시도해 주세요.';
      alert(errorMessage);
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
