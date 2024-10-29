import styled from 'styled-components';
import React from 'react';

const Button = styled.button`
  width: ${(props) => props.btnSize || 'fit-content'};
  cursor: pointer;
  border: none;
  border-radius: 0.25rem;
  background-color: ${(props) => props.bgColor || 'black'};
  color: ${(props) => props.color || 'white'};
  font-weight: 500;
  padding: 0.4rem 0.8rem;
  opacity: 1;
  &:hover {
    opacity: 0.5;
  }
`;

export const UniBtn = ({
  onClick,
  type = 'button',
  children,
  bgColor,
  color,
  btnSize,
  ...rest
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      bgColor={bgColor}
      color={color}
      btnSize={btnSize}
      {...rest}
    >
      {children}
    </Button>
  );
};

export const BlueBtn = styled(UniBtn)`
  background-color: ${({ theme }) => theme.pointColor};
  font-size: 0.8rem;
  letter-spacing: 1px;
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
`;
