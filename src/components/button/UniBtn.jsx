import styled from 'styled-components';
import React from 'react';
const Button = styled.button`
  width: ${(props) => props.btnSize || 'fit-content'};
  cursor: pointer;
  border: none;
  border-radius: 0.25rem;
  background-color: ${(props) => props.bgColor || 'black'};
  color: #ffffff;
  font-weight: 500;
  padding: 0.4rem 0.8rem;
  opacity: 1;
  &:hover {
    opacity: 0.5;
  }
`;

export const UniBtn = ({ onClick, type = 'button', children, bgColor, btnSize, ...rest }) => {
  return (
    <Button onClick={onClick} type={type} bgColor={bgColor} btnSize={btnSize} {...rest}>
      {children}
    </Button>
  );
};
