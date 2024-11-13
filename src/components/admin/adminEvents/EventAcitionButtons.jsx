import React from 'react';
import { Button } from 'antd';

const EventActionButton = ({ eventId, email, action, onAction }) => (
  <Button
    type={action === 'approve' ? 'primary' : 'danger'}
    onClick={() => onAction(eventId, action, email)}
    style={{ marginRight: action === 'approve' ? 8 : 0 }}
  >
    {action === 'approve' ? '승인' : '거절'}
  </Button>
);

export default EventActionButton;
