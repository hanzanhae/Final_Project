import React from 'react';
import { Pagination } from 'antd';

const EventsPagination = ({ currentPage, totalEvents, onPageChange }) => (
  <Pagination
    current={currentPage}
    total={totalEvents}
    pageSize={5}
    onChange={(page) => onPageChange(page)}
    style={{ marginTop: 20, textAlign: 'center' }}
  />
);

export default EventsPagination;
