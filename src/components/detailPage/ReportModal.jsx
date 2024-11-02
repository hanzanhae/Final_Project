import React, { useState } from 'react';
import { UniBtn } from '../button/UniBtn';
import styled from 'styled-components';
import ReportModalOption from './ReportModalOption';

const ReportModal = ({ setShowModal, setActiveMember }) => {
  const [selectedReport, setSelectedReport] = useState('');

  const handleCloseModal = () => {
    setShowModal(false);
    setActiveMember(null);
  };

  const handleInputChange = (e) => {
    setSelectedReport(e.target.value);
  };
  const handleReport = () => {
    console.log(selectedReport);
    handleCloseModal();
  };

  return (
    <ModalWrapper onClick={handleCloseModal}>
      <ReportBox
        as="form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleReport}
      >
        <ReportModalOption handleInputChange={handleInputChange} />
        <ReportText>정말로 신고하시겠습니까?</ReportText>
        <ReportBtnBox>
          <UniBtn onClick={handleCloseModal} $bgcolor="#666">
            아니요
          </UniBtn>
          <UniBtn type="submit">신고하기</UniBtn>
        </ReportBtnBox>
      </ReportBox>
    </ModalWrapper>
  );
};

export default ReportModal;

// style
const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  cursor: default;
`;
const ReportBox = styled.div`
  width: 40vw;
  padding: 1rem 2rem;
  background-color: #fff;
  border: 1px solid #ececec;
  border-radius: 0.25rem;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ReportText = styled.p`
  margin-top: 1rem;
  color: #666;
`;
const ReportBtnBox = styled.div`
  width: fit-content;
  margin: auto;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
`;
