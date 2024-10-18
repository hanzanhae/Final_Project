import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/api';
import { isValidEmail, isValidPassword } from '../../utils/validation.js';
import * as S from '../../styles/loginStyle/LoginFormStyle.js';
import KakaoLoginImg from '../../images/카카오로그인.png';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 이메일 입력 핸들러
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(!value || !isValidEmail(value));
  };

  // 이메일 유효성 확인
  const handleEmailBlur = () => {
    if (!isValidEmail(email)) {
      setEmailError(true);
    }
  };

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordError(
      !isValidPassword(value)
        ? '비밀번호는 영문자와 숫자를 포함하여 8자 이상 20자 이하로 입력해야 합니다.'
        : ''
    );
  };

  const handlePasswordBlur = () => {
    if (!isValidPassword(password)) {
      setPasswordError('비밀번호는 영문자와 숫자를 포함하여 8자 이상 20자 이하로 입력해야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  // 로그인 요청 함수
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    if (emailError || passwordError) {
      setError('이메일이나 비밀번호를 확인해 주세요.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await login(email, password);
      const accessToken = response.headers['authorization'].split(' ')[1];

      localStorage.setItem('accessToken', accessToken);

      navigate('/');
    } catch (error) {
      console.error('로그인 에러 발생:', error);
      setError(error.message || '로그인 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithKakao = () => {
    if (window.Kakao) {
      window.Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/' // 카카오 개발자 콘솔에 등록한 리다이렉트 URI로 변경
      });
    }
  };

  useEffect(() => {
    // Kakao SDK 스크립트 로드
    const kakaoScript = document.createElement('script');
    kakaoScript.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    kakaoScript.integrity =
      'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
    kakaoScript.crossOrigin = 'anonymous';

    kakaoScript.onload = () => {
      if (window.Kakao) {
        window.Kakao.init('c9ae47ba431b9b064755d4472cdb5ed9');
      }
    };

    document.head.appendChild(kakaoScript);

    return () => {
      document.head.removeChild(kakaoScript);
    };
  }, []);
  return (
    <S.FormContainer>
      <S.Title>로그인</S.Title>
      <S.Form onSubmit={handleLogin}>
        <S.InputContainer>
          <S.Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder="이메일을 입력하세요"
            error={emailError ? 'true' : undefined}
          />
          <S.CustomIcon2 />
        </S.InputContainer>
        <S.ErrorWrapper>
          {emailError && <S.ErrorMessage>유효한 이메일 주소를 입력해 주세요.</S.ErrorMessage>}
        </S.ErrorWrapper>
        <S.InputContainer>
          <S.Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            placeholder="비밀번호를 입력해 주세요."
            error={passwordError ? 'true' : undefined}
          />

          <S.CustomIcon3 />
        </S.InputContainer>
        <S.ErrorWrapper>
          {passwordError && <S.ErrorMessage>{passwordError}</S.ErrorMessage>}
        </S.ErrorWrapper>
        <S.ErrorWrapper>{error && <S.ErrorMessage>{error}</S.ErrorMessage>}</S.ErrorWrapper>
        <S.Btn $isLoading={isLoading}>로그인</S.Btn>
        <S.KakaoLoginBox onClick={loginWithKakao}>
          <img src={KakaoLoginImg} alt="카카오로그인" width="222" />
        </S.KakaoLoginBox>
      </S.Form>
    </S.FormContainer>
  );
};

export default LoginForm;
