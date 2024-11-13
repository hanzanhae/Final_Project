import styled from 'styled-components';
import React from 'react';

export const UniBtn = ({
  onClick,
  type = 'button',
  children,
  $bgcolor,
  color,
  btnSize,
  $margin,
  $padding,
  $bordorradius
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      $bgcolor={$bgcolor}
      color={color}
      btnSize={btnSize}
      $margin={$margin}
      $padding={$padding}
      $bordorradius={$bordorradius}
    >
      {children}
    </Button>
  );
};

// style
const Button = styled.button`
  margin: ${(props) => props.$margin || '0'};
  width: ${(props) => props.btnSize || 'fit-content'};
  cursor: pointer;
  border: none;
  border-radius: ${(props) => props.$bordorradius || '0.5rem'};
  background-color: ${(props) => props.$bgcolor || props.theme.pointColor};
  color: ${(props) => props.color || 'white'};
  font-size: 1rem;
  font-weight: 500;
  padding: ${(props) => props.$padding || '0.25rem 0.5rem'};
  opacity: 0.9;
  position: relative;
  transition: transform 0.3s;
  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }
  @media (max-width: 1440px) {
    font-size: 0.8rem;
  }
`;
