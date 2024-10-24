import React, { useState } from 'react';
import {
  ModalWrapper,
  ReportBox,
  ReportBtnBox,
  ReportInput,
  ReportLabel,
  ReportLi,
  ReportNoBtn,
  ReportText,
  ReportTitle,
  ReportUl,
  ReportYesBtn
} from '../../styles/detailPage/DetailStyle';

const ReportModal = ({ setShowModal, stopEventHandler, setActiveMember }) => {
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
      <ReportBox as="form" onClick={stopEventHandler} onSubmit={handleReport}>
        <ReportTitle>신고사유를 선택해주세요</ReportTitle>
        <ReportUl>
          {['불법정보게시', '욕설/인신공격', '음란성/선정성', '같은내용 반복게시', '잦은노쇼'].map(
            (report, index) => (
              <ReportLi key={index}>
                <ReportInput
                  type="radio"
                  name="report"
                  id={report}
                  value={report}
                  onChange={handleInputChange}
                  required
                />
                <ReportLabel htmlFor={report}>{report}</ReportLabel>
              </ReportLi>
            )
          )}
        </ReportUl>
        <ReportText>정말로 신고하시겠습니까?</ReportText>
        <ReportBtnBox>
          <ReportNoBtn onClick={handleCloseModal}>아니요</ReportNoBtn>
          <ReportYesBtn type="submit">신고하기</ReportYesBtn>
        </ReportBtnBox>
      </ReportBox>
    </ModalWrapper>
  );
};

export default ReportModal;
