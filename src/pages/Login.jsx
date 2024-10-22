import React, { useState } from 'react';
import * as S from '../styles/loginStyle/LoginPageStyle';
import LoginForm from '../components/login/LoginForm';
import SignUpForm from '../components/signUp/SignUpForm';

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignInClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignUpClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    <S.ImageContainer>
      <S.Container>
        <S.FormContainer $isSignUp={!isRightPanelActive} $isRightPanelActive={!isRightPanelActive}>
          <LoginForm />
        </S.FormContainer>

        <S.FormContainer $isSignUp={isRightPanelActive} $isRightPanelActive={!isRightPanelActive}>
          <SignUpForm />
        </S.FormContainer>

        <S.OverlayContainer $isRightPanelActive={isRightPanelActive}>
          <S.Overlay $isRightPanelActive={isRightPanelActive}>
            <S.OverlayPanel $isLeft={!isRightPanelActive}>
              <S.Button onClick={handleSignInClick}>회원가입 하기</S.Button>
            </S.OverlayPanel>
            <S.OverlayPanel2 $isLeft={isRightPanelActive}>
              <S.Button onClick={handleSignUpClick}>로그인 하기</S.Button>
            </S.OverlayPanel2>
          </S.Overlay>
        </S.OverlayContainer>
      </S.Container>
    </S.ImageContainer>
  );
};

export default Login;
