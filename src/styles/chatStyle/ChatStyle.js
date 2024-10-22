import styled, { keyframes, css } from 'styled-components';
import Run from '../../images/running.png';

const moveLeftToRight = keyframes`
  0% {
    transform: translateX(-50px);
  }
  50% {
    transform: translateX(0); /* 오른쪽으로 50px 이동 */
  }
  100% {
    transform: translateX(-50px); /* 다시 왼쪽으로 복귀 */
  }
`;
const scaleUp = keyframes`
  0% {
    transform: scale(1);
  }
  80% {
    transform: scale(4);
  }
  100%{
    opacity:0;
  }
`;
export const ChatIcon = styled.div`
  position: fixed;
  bottom: ${({ $isOpen }) => ($isOpen ? '400px' : '20px')};
  right: ${({ $isOpen }) => ($isOpen ? '400px' : '20px')};
  width: ${({ $isOpen }) => ($isOpen ? '400px' : '80px')}; /* 채팅방이 열리면 크기 변경 */
  height: ${({ $isOpen }) => ($isOpen ? '400px' : '80px')}; /* 채팅방이 열리면 크기 변경 */
  background: url(${Run});
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  border-radius: 50%;
  z-index: 1000;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: all 0.5s ease;
  cursor: pointer;
  ${({ $isOpen }) =>
    $isOpen
      ? css`
          animation: ${scaleUp} 0.5s forwards;
        `
      : css`
          animation: ${moveLeftToRight} 2s infinite;
        `}
`;

export const ChatBox = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  width: 400px;
  height: 50rem;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 100px;
  right: 3rem;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;
