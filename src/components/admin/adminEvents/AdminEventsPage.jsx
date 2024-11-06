import React, { useEffect, useState } from 'react';
import { Row, Col, message } from 'antd';
import axios from '../../../api/instance';
import EventsChart from './EventsChart';
import ParticipantsChart from './ParticipantsChart';
import EventTable from './EventTable';

const AdminEventsPage = () => {
  const [monthlyEvents, setMonthlyEvents] = useState([]);
  const [monthlyParticipants, setMonthlyParticipants] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [eventsRes, participantsRes, eventListRes] = await Promise.all([
          axios.get('/admin/stats/events_per_month'),
          axios.get('/admin/event_participants_per_month'),
          axios.get('/api/events')
        ]);

        setMonthlyEvents(eventsRes.data);
        setMonthlyParticipants(participantsRes.data);
        setEventList(eventListRes.data);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAction = async (eventId, action) => {
    try {
      await axios.patch(`/admin/events/${eventId}?action=${action}`);
      message.success(`이벤트 ${action === 'approve' ? '승인' : '거부'} 완료`);
      setEventList(eventList.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error(`이벤트 ${action} 중 오류 발생:`, error);
      message.error(
        `이벤트 ${action === 'approve' ? '승인' : '거부'} 중 오류 발생`
      );
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>이벤트 관리</h1>
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} md={12}>
          <EventsChart data={monthlyEvents} />
        </Col>
        <Col xs={24} md={12}>
          <ParticipantsChart data={monthlyParticipants} />
        </Col>
      </Row>
      <EventTable data={eventList} loading={loading} onAction={handleAction} />
    </div>
  );
};

export default AdminEventsPage;
