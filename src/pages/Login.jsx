import React, { useState } from 'react';
import LoginForm from '../components/login/LoginForm';
import SignUpForm from '../components/signUp/SignUpForm';
import styled, { css } from 'styled-components';
import BannerImg from '../images/bannerImg.jpg';

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignInClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignUpClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    <ImageContainer>
      <Container>
        <FormContainer
          $isSignUp={!isRightPanelActive}
          $isRightPanelActive={!isRightPanelActive}
        >
          <LoginForm />
        </FormContainer>

        <FormContainer
          $isSignUp={isRightPanelActive}
          $isRightPanelActive={!isRightPanelActive}
        >
          <SignUpForm />
        </FormContainer>

        <OverlayContainer $isRightPanelActive={isRightPanelActive}>
          <Overlay $isRightPanelActive={isRightPanelActive}>
            <OverlayPanel $isLeft={!isRightPanelActive}>
              <Button onClick={handleSignInClick}>회원가입 하기</Button>
            </OverlayPanel>
            <OverlayPanel2 $isLeft={isRightPanelActive}>
              <Button onClick={handleSignUpClick}>로그인 하기</Button>
            </OverlayPanel2>
          </Overlay>
        </OverlayContainer>
      </Container>
    </ImageContainer>
  );
};

export default Login;

/* eslint-disable indent */
export const ImageContainer = styled.div`
  background: url(${BannerImg});
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  width: 100vw;
  height: 92vh;
  position: relative;
  align-items: center;
  filter: ${({ theme }) => theme.filter};

  /* @media (max-width: 1440px) {
    height: 90vh;
  }

  @media (max-width: 1024px) {
    height: 80vh;
  }

  @media (max-width: 768px) {
    height: 60vh;
  } */
`;

export const Container = styled.div`
  border-radius: 0.7rem;
  box-shadow:
    0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: 70vh;
  width: 50vw;
  overflow: hidden;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.6s ease-in-out;

  @media (max-width: 1920px) {
    height: 80vh;
    width: 50vw;
  }

  @media (max-width: 1600px) {
    height: 90vh;
    width: 50vw;
  }
`;

export const FormContainer = styled.div`
  background-color: #ebebeb;
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
  width: 50%;
  z-index: ${({ $isSignUp }) => ($isSignUp ? 2 : 1)};
  opacity: ${({ $isSignUp }) => ($isSignUp ? 1 : 0)};
  left: 0;
  transform: ${({ $isRightPanelActive }) =>
    $isRightPanelActive ? 'translateX(0)' : 'translateX(100%)'};

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const Button = styled.button`
  background-color: black;
  background-image: linear-gradient(90deg, black 0%, gray 74%);
  border-radius: 20px;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  @media (max-width: 1024px) {
    padding: 0.7rem 3rem;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.5rem 2.5rem;
  }
`;

export const OverlayContainer = styled.div`
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
  transform: ${({ $isRightPanelActive }) =>
    $isRightPanelActive ? 'translateX(-100%)' : 'translateX(0)'};

  @media (max-width: 1024px) {
    width: 100%;
    left: 0;
    transform: ${({ $isRightPanelActive }) =>
      $isRightPanelActive ? 'translateX(-100%)' : 'translateX(0)'};
  }
`;

export const Overlay = styled.div`
  background: url(${BannerImg});
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  left: -100%;
  position: relative;
  transition: transform 0.6s ease-in-out;
  width: 200%;
  transform: ${({ $isRightPanelActive }) =>
    $isRightPanelActive ? ' translateX(50%)' : 'translateX(0)'};

  @media (max-width: 1024px) {
    width: 150%;
    transform: ${({ $isRightPanelActive }) =>
      $isRightPanelActive ? 'translateX(25%)' : 'translateX(0)'};
  }
`;

export const OverlayPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  text-align: center;
  transition: transform 0.6s ease-out-in;
  ${({ $isLeft }) =>
    $isLeft
      ? css`
          right: 0;
          transform: translateX(
            ${({ $isRightPanelActive }) => ($isRightPanelActive ? '100%' : '0')}
          );
        `
      : css`
          left: 0;
          transform: translateX(
            ${({ $isRightPanelActive }) =>
              $isRightPanelActive ? '0' : '-100%'}
          );
        `}

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const OverlayPanel2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  text-align: center;
  transition: transform 0.6s ease-out-in;
  ${({ $isLeft }) =>
    $isLeft
      ? css`
          left: 0;
          transform: translateX(
            ${({ $isRightPanelActive }) => ($isRightPanelActive ? '100%' : '0')}
          );
        `
      : css`
          left: 0;
          transform: translateX(
            ${({ $isRightPanelActive }) =>
              $isRightPanelActive ? '0' : '-100%'}
          );
        `}

  @media (max-width: 1024px) {
    width: 100%;
  }
`;
