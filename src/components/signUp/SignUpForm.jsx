import React, { useEffect, useState } from 'react';
import * as S from '../../styles/signUpStyle/SignupStyle';
import {
  isValidEmail,
  isValidPassword,
  containSlang
} from '../../utils/validation';
import { formSubmit } from '../../api/api';

const SignUpForm = () => {
  // const [email, setEmail] = useState('');
  // const [emailMessage, setEmailMessage] = useState('');
  // const [emailStatus, setEmailStatus] = useState(null);
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
  // const handleEmailCheck = async () => {
  //   try {
  //     const response = await checkEmail(email);

  //     if (response.status === 200) {
  //       setEmailMessage('사용 가능한 이메일입니다.');
  //       setEmailStatus(true);
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       const { status, data } = error.response;

  //       if (status === 409) {
  //         setEmailMessage(data.message);
  //         setEmailStatus(false);
  //       }

  //       if (status === 400 && data.field_errors) {
  //         const emailError = data.field_errors.find(
  //           (error) => error.field === 'email'
  //         );

  //         if (emailError) {
  //           setEmailMessage(emailError.message);
  //         }
  //         setEmailStatus(false); // 이메일 사용 불가능 상태 설정
  //       }
  //     } else {
  //       console.error('이메일 체크 중 알 수 없는 오류 발생:', error);
  //       setEmailMessage('이메일 확인 중 오류가 발생했습니다.');
  //       setEmailStatus(false);
  //     }
  //   }
  // };

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
    console.log('Submit button clicked');
    // eslint-disable-next-line no-unused-vars
    const formDataToSend = new FormData();
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('nickname', formData.nickname);

    try {
      const response = await formSubmit(formDataToSend);
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error.message); // 에러 메시지 출력
    }
  };

  return (
    <S.FormContainer>
      <S.Title>회원가입</S.Title>
      <S.Form onSubmit={handleSubmit}>
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
                // setEmail(e.target.value); // 이메일 상태 업데이트
              }}
              onBlur={handleBlur}
            />
            <S.SmallButton type="button">중복 확인</S.SmallButton>
          </S.InputWrapper>
        </S.InputContainer>
        {/* <S.ErrorWrapper>
          {errors.email && <S.ErrorMsg>{errors.email}</S.ErrorMsg>}
          {emailMessage && (
            <S.EmailStatusMessage success={emailStatus}>
              {emailMessage}
            </S.EmailStatusMessage>
          )}
        </S.ErrorWrapper> */}
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
