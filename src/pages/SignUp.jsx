import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const SignUp = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignInClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignUpClick = () => {
    setIsRightPanelActive(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ImageContainer>
      <Container>
        <FormContainer $isSignUp={!isRightPanelActive} $isRightPanelActive={!isRightPanelActive}>
          <Form onSubmit={handleFormSubmit}>
            <Title>회원가입</Title>
            <Input type="text" placeholder="User" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Button>Sign Up</Button>
          </Form>
        </FormContainer>

        <FormContainer $isSignUp={isRightPanelActive} $isRightPanelActive={!isRightPanelActive}>
          <Form onSubmit={handleFormSubmit}>
            <Title>로그인</Title>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Button>Sign In</Button>
          </Form>
        </FormContainer>

        <OverlayContainer $isRightPanelActive={isRightPanelActive}>
          <Overlay $isRightPanelActive={isRightPanelActive}>
            <OverlayPanel $isLeft={!isRightPanelActive}>
              <Button onClick={handleSignInClick}>Sign In</Button>
            </OverlayPanel>
            <OverlayPanel2 $isLeft={isRightPanelActive}>
              <Button onClick={handleSignUpClick}>Sign Up</Button>
            </OverlayPanel2>
          </Overlay>
        </OverlayContainer>
      </Container>
    </ImageContainer>
  );
};

export default SignUp;

const ImageContainer = styled.div`
  background: url('https://images.unsplash.com/photo-1502224562085-639556652f33?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  width: 100vw;
  height: 100vh;
  position: relative;
  align-items: center;
`;

const Container = styled.div`
  border-radius: 0.7rem;
  box-shadow:
    0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: 500px;
  max-width: 1000px;
  overflow: hidden;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  transition: transform 0.6s ease-in-out;
`;

const FormContainer = styled.div`
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-weight: 300;
  margin: 0;
  margin-bottom: 1.25rem;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid var(--gray);
  border-radius: 5px;
  width: 100%;
`;

const Button = styled.button`
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
`;

const OverlayContainer = styled.div`
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
`;

const Overlay = styled.div`
  background-color: var(--lightblue);
  background: url('https://images.unsplash.com/photo-1502224562085-639556652f33?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
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
`;

const OverlayPanel = styled.div`
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
            ${({ $isRightPanelActive }) => ($isRightPanelActive ? '0' : '-100%')}
          );
        `}
`;
const OverlayPanel2 = styled.div`
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
            ${({ $isRightPanelActive }) => ($isRightPanelActive ? '0' : '-100%')}
          );
        `}
`;
