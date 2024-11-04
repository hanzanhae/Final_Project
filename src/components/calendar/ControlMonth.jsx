import React from 'react';
import styled from 'styled-components';

const ControlMonth = ({
  monthYearString,
  handlePrevMonth,
  handleNextMonth
}) => (
  <Month>
    <PrevButton onClick={handlePrevMonth}>❮</PrevButton>
    <Year>{monthYearString}</Year>
    <NextButton onClick={handleNextMonth}>❯</NextButton>
  </Month>
);

export default ControlMonth;

const Month = styled.div`
  width: 100%;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  font-size: 1.2rem;
  font-weight: 550;
  margin-bottom: 30px;
`;

const PrevButton = styled.div`
  cursor: pointer;
`;

const Year = styled.div``;

const NextButton = styled.div`
  cursor: pointer;
`;
