import React, { useEffect, useState } from 'react';
import { Card, Row, Col, message } from 'antd';
import axios from '../../../api/instance';
import EventTable from './EventTable';
import EventsPagination from './EventsPagination';
import EventsChart from './EventsChart';
import ParticipantsChart from './ParticipantsChart';

const AdminEventsPage = () => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [eventsChartData, setEventsChartData] = useState([]);
  const [participantsChartData, setParticipantsChartData] = useState([]);

  const fetchEvents = async (page = 0, size = 5) => {
    setLoading(true);
    try {
      const response = await axios.get('/admin/events', {
        params: { page, size, sort: 'created_at,desc' }
      });
      setEventsData(response.data.content);
      setTotalEvents(response.data.totalElements);
      setCurrentPage(page);
    } catch (error) {
      console.error('이벤트 데이터를 불러오는 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventsChartData = async () => {
    try {
      const response = await axios.get(
        '/admin/events/events_per_month?eventCount=EVENTS_PER_MONTH'
      );
      setEventsChartData(response.data);
    } catch (error) {
      console.error('월별 이벤트 데이터를 불러오는 중 오류 발생:', error);
    }
  };

  const fetchParticipantsChartData = async () => {
    try {
      const response = await axios.get(
        '/admin/events/events_per_month?eventCount=EVENT_PARTICIPANTS_PER_MONTH'
      );
      setParticipantsChartData(response.data);
    } catch (error) {
      console.error('참가자 차트 데이터를 불러오는 중 오류 발생:', error);
    }
  };

  const handleApprovalAction = async (eventId, email, action) => {
    try {
      await axios.patch(`/admin/events/${eventId}?action=${action}`, {
        status: action.toUpperCase(),
        email
      });
      message.success(
        `이벤트 ${action === 'approve' ? '승인' : '거절'} 완료 및 메일 발송 성공!`
      );
      fetchEvents(currentPage);
    } catch (error) {
      console.error(`이벤트 ${action} 중 오류 발생:`, error);
      message.error(`이벤트 ${action === 'approve' ? '승인' : '거절'} 실패`);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchEventsChartData();
    fetchParticipantsChartData();
  }, []);

  const handlePageChange = (page) => {
    fetchEvents(page - 1);
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>이벤트 승인 대기 목록</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="월별 이벤트 개설 수">
            <EventsChart data={eventsChartData} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="월별 이벤트 참가자 수">
            <ParticipantsChart data={participantsChartData} />
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: '20px' }}>
        <EventTable
          data={eventsData}
          loading={loading}
          onApprove={(id, email) => handleApprovalAction(id, email, 'approve')}
          onReject={(id, email) => handleApprovalAction(id, email, 'reject')}
        />
        <EventsPagination
          currentPage={currentPage + 1}
          totalEvents={totalEvents}
          onPageChange={handlePageChange}
        />
      </Card>
    </div>
  );
};

export default AdminEventsPage;
