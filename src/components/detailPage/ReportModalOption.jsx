import React from 'react';
import styled from 'styled-components';

const reportOptions = [
  '불법정보게시',
  '욕설/인신공격',
  '음란성/선정성',
  '같은내용 반복게시',
  '잦은노쇼'
];

const ReportModalOption = ({ handleInputChange }) => {
  return (
    <>
      <ReportTitle>신고사유를 선택해주세요</ReportTitle>
      <ReportUl>
        {reportOptions.map((option, index) => (
          <ReportLi key={index}>
            <ReportInput
              type="radio"
              name="option"
              id={option}
              value={option}
              onChange={handleInputChange}
              required
            />
            <ReportLabel htmlFor={option}>{option}</ReportLabel>
          </ReportLi>
        ))}
      </ReportUl>
    </>
  );
};

export default ReportModalOption;

// style
const ReportTitle = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
`;
const ReportUl = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const ReportLi = styled.li`
  width: fit-content;
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 0.8rem;
  line-height: 40px;
  cursor: pointer;
`;
const ReportInput = styled.input`
  margin-right: 0.25rem;
  cursor: pointer;
`;
const ReportLabel = styled.label`
  cursor: pointer;
`;
