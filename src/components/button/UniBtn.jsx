import styled from 'styled-components';
import React from 'react';

const Button = styled.button`
  margin: ${(props) => props.$margin || '0'};
  width: ${(props) => props.btnSize || 'fit-content'};
  cursor: pointer;
  border: none;
  border-radius: 0.25rem;
  background-color: ${(props) => props.$bgcolor || props.theme.pointColor};
  color: ${(props) => props.color || 'white'};
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

export const UniBtn = ({
  onClick,
  type = 'button',
  children,
  $bgcolor,
  color,
  btnSize,
  $margin
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      $bgcolor={$bgcolor}
      color={color}
      btnSize={btnSize}
      $margin={$margin}
    >
      {children}
    </Button>
  );
};
