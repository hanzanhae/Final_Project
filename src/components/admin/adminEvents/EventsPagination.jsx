import React from 'react';
import { Pagination } from 'antd';

const EventsPagination = ({
  currentPage,
  totalEvents,
  pageSize,
  onPageChange,
  first,
  last
}) => (
  <Pagination
    current={currentPage}
    total={totalEvents}
    pageSize={pageSize}
    onChange={(page) => onPageChange(page - 1)}
    style={{ marginTop: 20, textAlign: 'center' }}
    disabled={first && last} // 페이지가 마지막/첫번째일 때 비활성화
  />
);

export default EventsPagination;
