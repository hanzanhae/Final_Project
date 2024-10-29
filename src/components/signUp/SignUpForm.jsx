import React, { useEffect, useState } from 'react';
import * as S from '../../styles/signUpStyle/SignupStyle';
import {
  isValidEmail,
  isValidPassword,
  containSlang
} from '../../utils/validation';
import Dragon from '../../images/dragon.png';
import Wolf from '../../images/wolf.png';
import Deer from '../../images/deer.png';
import Dog from '../../images/dog.png';
import { useNavigate } from 'react-router-dom';
import { checkEmail, formSubmit } from '../../api/api';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [emailStatus, setEmailStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: ''
  });

  const [terms, setTerms] = useState({
    allAgree: false,
    service: false,
    personalInfo: false,
    marketing: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    const formFieldsFilled = Object.values(formData).every(
      (value) => value !== ''
    );
    const noErrors = Object.keys(errors).length === 0;
    const termsAccepted = terms.service && terms.personalInfo;

    setIsFormValid(formFieldsFilled && noErrors && termsAccepted);
  }, [formData, errors, terms]);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (name === 'email') {
      if (!isValidEmail(value)) {
        newErrors.email = '유효하지 않은 이메일 형식입니다.';
      } else {
        delete newErrors.email;
      }
    }

    if (name === 'password') {
      if (!isValidPassword(value)) {
        newErrors.password =
          '비밀번호는 8자에서 20자 사이여야 하며, 최소 하나의 문자와 하나의 숫자를 포함해야 합니다.';
      } else {
        delete newErrors.password;
      }
    }

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      } else {
        delete newErrors.confirmPassword;
      }
    }

    if (name === 'nickname') {
      if (containSlang(value)) {
        newErrors.nickname = '닉네임에 부적절한 언어가 포함되어 있습니다.';
      } else {
        delete newErrors.nickname;
      }
    }

    setErrors(newErrors);
  };

  // 이메일 중복 체크
  const handleEmailCheck = async () => {
    try {
      const response = await checkEmail(email);

      if (response.status === 200) {
        setEmailMessage('사용 가능한 이메일입니다.');
        setEmailStatus(true);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 409) {
          setEmailMessage(data.message);
          setEmailStatus(false);
        }

        if (status === 400 && data.field_errors) {
          const emailError = data.field_errors.find(
            (error) => error.field === 'email'
          );

          if (emailError) {
            setEmailMessage(emailError.message);
          }
          setEmailStatus(false); // 이메일 사용 불가능 상태 설정
        }
      } else {
        console.error('이메일 체크 중 알 수 없는 오류 발생:', error);
        setEmailMessage('이메일 확인 중 오류가 발생했습니다.');
        setEmailStatus(false);
      }
    }
  };

  // 입력 필드 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleTermsChange = (e) => {
    const { name, checked } = e.target;

    setTerms((prevTerms) => {
      const updatedTerms = {
        ...prevTerms,
        [name]: checked
      };

      if (
        name !== 'allAgree' &&
        (!updatedTerms.service ||
          !updatedTerms.personalInfo ||
          !updatedTerms.marketing)
      ) {
        updatedTerms.allAgree = false;
      }

      if (name === 'allAgree') {
        updatedTerms.service = checked;
        updatedTerms.personalInfo = checked;
        updatedTerms.marketing = checked;
      }

      if (
        updatedTerms.service &&
        updatedTerms.personalInfo &&
        updatedTerms.marketing
      ) {
        updatedTerms.allAgree = true;
      }

      return updatedTerms;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-unused-vars
    const formDataToSend = new FormData();
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('nickname', formData.nickname);

    if (selectedFile) {
      formDataToSend.append('profileImage', selectedFile); // 파일이 있으면 선택한 파일을 전송
    } else {
      formDataToSend.append('profileImage', selectedProfileImg); // 기본 이미지 전송
    }
    try {
      const response = await formSubmit(formDataToSend);
      if (response.message === 'success signup') {
        navigate('/');
        alert('회원가입 성공');
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedProfileImg, setSelectedProfileImg] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // 프리뷰로 표시할 URL 생성
    }
  };
  const handleProfileImgClick = (img) => {
    setSelectedProfileImg(img);
    setSelectedFile(null); // 기본 이미지를 선택하면 파일을 초기화
    setPreview(null); // 프리뷰도 초기화
  };

  return (
    <S.FormContainer>
      <S.Title>회원가입</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.ProfileContainer>
          <S.AddProfileImg
            onClick={() => document.getElementById('profileImageInput').click()}
          >
            {preview ? (
              <img
                src={preview}
                alt="프리뷰"
                style={{ width: '60px', height: '60px', borderRadius: '50%' }}
              />
            ) : (
              '+'
            )}
          </S.AddProfileImg>
          <input
            type="file"
            id="profileImageInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
          <S.ProfileImg1
            $isselected={selectedProfileImg === Dragon}
            backgroundimage={Dragon}
            onClick={() => handleProfileImgClick(Dragon)}
          ></S.ProfileImg1>
          <S.ProfileImg1
            $isselected={selectedProfileImg === Wolf}
            backgroundimage={Wolf}
            onClick={() => handleProfileImgClick(Wolf)}
          ></S.ProfileImg1>
          <S.ProfileImg1
            $isselected={selectedProfileImg === Deer}
            backgroundimage={Deer}
            onClick={() => handleProfileImgClick(Deer)}
          ></S.ProfileImg1>
          <S.ProfileImg1
            $isselected={selectedProfileImg === Dog}
            backgroundimage={Dog}
            onClick={() => handleProfileImgClick(Dog)}
          ></S.ProfileImg1>
        </S.ProfileContainer>

        <S.InputContainer>
          <S.Input
            type="text"
            name="nickname"
            placeholder="닉네임을 입력하세요"
            value={formData.nickname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </S.InputContainer>
        <S.InputContainer>
          <S.InputWrapper>
            <S.Input
              type="email"
              name="email"
              placeholder="이메일을 입력하세요"
              style={{ marginRight: '15px' }}
              value={formData.email}
              onChange={(e) => {
                handleChange(e);
                setEmail(e.target.value); // 이메일 상태 업데이트
              }}
              onBlur={handleBlur}
            />
            <S.SmallButton type="button" onClick={handleEmailCheck}>
              중복 확인
            </S.SmallButton>
          </S.InputWrapper>
        </S.InputContainer>
        <S.ErrorWrapper>
          {errors.email && <S.ErrorMsg>{errors.email}</S.ErrorMsg>}
          {emailMessage && (
            <S.EmailStatusMessage success={emailStatus}>
              {emailMessage}
            </S.EmailStatusMessage>
          )}
        </S.ErrorWrapper>
        <S.InputContainer>
          <S.Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </S.InputContainer>
        <S.ErrorWrapper>
          {errors.password && <S.ErrorMsg>{errors.password}</S.ErrorMsg>}
        </S.ErrorWrapper>
        <S.InputContainer>
          <S.Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </S.InputContainer>
        <S.ErrorWrapper>
          {errors.confirmPassword && (
            <S.ErrorMsg>{errors.confirmPassword}</S.ErrorMsg>
          )}
        </S.ErrorWrapper>
        <S.TermsContainer>
          <S.TermsHeader>
            서비스 이용 약관과 개인정보 수집 및 이용을 확인하시고, 만 14세
            이상임에 동의하신 후 미리 보기 화면으로 이동하시기 바랍니다.
          </S.TermsHeader>
          <S.TermsWrapper>
            <S.Checkbox
              type="checkbox"
              name="allAgree"
              checked={terms.allAgree}
              onChange={handleTermsChange}
            />
            모든 항목에 동의합니다.
          </S.TermsWrapper>
          <S.TermsWrapper>
            <S.Checkbox
              type="checkbox"
              name="service"
              checked={terms.service}
              onChange={handleTermsChange}
            />
            [서비스 이용약관] (필수)
          </S.TermsWrapper>
          <S.TermsWrapper>
            <S.Checkbox
              type="checkbox"
              name="personalInfo"
              checked={terms.personalInfo}
              onChange={handleTermsChange}
            />
            [개인정보 수집 및 이용 동의] (필수)
          </S.TermsWrapper>
          <S.TermsWrapper>
            <S.Checkbox
              type="checkbox"
              name="marketing"
              checked={terms.marketing}
              onChange={handleTermsChange}
            />
            마케팅 수신 동의 (선택)
          </S.TermsWrapper>
        </S.TermsContainer>
        <S.SubmitButtonWrapper>
          <S.Btn type="submit" disabled={!isFormValid}>
            가입
          </S.Btn>
        </S.SubmitButtonWrapper>
      </S.Form>
    </S.FormContainer>
  );
};

export default SignUpForm;
