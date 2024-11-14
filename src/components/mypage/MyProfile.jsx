// MyProfile.jsx
import { getProfile } from '../../api/api';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MyProfile = () => {
  const [profile, setProfile] = useState({
    email: '',
    nickname: '',
    gender: '',
    status: '',
    signupAt: '',
    profileImage: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        console.error('User ID is missing');
        return;
      }
      try {
        const data = await getProfile();
        setProfile({
          email: data.email,
          nickname: data.nikname,
          gender: data.gender,
          status: data.status,
          signupAt: data.singup_at,
          profileImage: data.profile_url || ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      });

      if (!response.ok) {
        throw new Error(
          '프로필 업데이트가 완료되지 않았습니다. 다시 시도해주세요'
        );
      }

      await response.json();
      alert('프로필이 업데이트 되었습니다');
    } catch (error) {
      alert(`Error updating profile: ${error.message}`);
      console.error('Error updating profile:', error);
    }
  };

  return (
    <ProfileContainer>
      <Title>내 프로필</Title>
      <ProfileImage src={profile.profileImage}>
        <UploadButton htmlFor="imageUpload">📷</UploadButton>
        <HiddenInput
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </ProfileImage>
      <ProfileForm onSubmit={handleSubmit}>
        <Label>이메일</Label>
        <Input type="email" value={profile.email} disabled />

        <Label>닉네임</Label>
        <Input
          type="text"
          name="nickname"
          value={profile.nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력하세요"
        />

        <Label>성별</Label>
        <Input type="text" value={profile.gender} disabled />

        <Label>상태</Label>
        <Input type="text" value={profile.status} disabled />

        <Label>가입일</Label>
        <Input type="text" value={profile.signupAt} disabled />

        <ButtonContainer>
          <SubmitButton type="submit">프로필 업데이트</SubmitButton>
        </ButtonContainer>
      </ProfileForm>
    </ProfileContainer>
  );
};

// 스타일
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  width: 70%;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 26px;
  color: #333;
  margin-bottom: 25px;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #e9ecef;
  background-image: url(${(props) => props.src || ''});
  background-size: cover;
  background-position: center;
  position: relative;
  margin-bottom: 20px;
`;

const UploadButton = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${({ theme }) => theme.pointColor};
  color: white;
  padding: 6px;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  position: relative;
  margin-top: 10px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #495057;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f8f9fa;
  &:disabled {
    background-color: #e9ecef;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  background-color: ${({ theme }) => theme.pointColor};
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export default MyProfile;
